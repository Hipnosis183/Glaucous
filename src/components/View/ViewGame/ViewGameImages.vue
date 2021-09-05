<template>
  <!-- View cover image. -->
  <hip-overlay
    v-if="getCover || getPictures[0]"
    v-show="dialog.viewImagesCover"
    @close="viewImagesCoverClose()"
    class="pos-initial z-10"
  >
    <div class="flex">
      <img
        @click="imageZoom = !imageZoom"
        :src="'file://' + imagePath + '/' + (getCover ? getCover : getPictures[0])"
        class="cursor-pointer object-contain rounded-xl"
        :class="[
          imageZoom ? 'h-full' : 'h-cover',
          { 'rendering-pixelated' : gameInfo.config.imageFiltering == false && !getCover }
        ]"
      />
    </div>
  </hip-overlay>
  <!-- View selected picture. -->
  <transition>
    <hip-overlay
      v-if="getPictures[imageIndex]"
      v-show="dialog.viewImagesPictures"
      @close="viewImagesPicturesClose()"
      class="pos-initial z-20"
    >
      <div
        ref="imageContainer"
        class="h-gallery mb-4 no-scrollbar overflow-y-scroll relative rounded-xl w-gallery"
      >
        <transition
          :name="slideBack ? 'slide-b' : 'slide-f'"
          class="absolute bottom-0 left-0 right-0 top-0"
        >
          <img
            ref="pictureImage"
            :key="imageIndex"
            @click="viewImagesPicturesClose()"
            @load="viewImagesPicturesLoad()"
            :src="'file://' + imagePath + '/' + getPictures[imageIndex]"
            class="object-contain rounded-xl"
            :class="[
              imageZoom
                ? ['h-auto mx-auto', imageCenter ? 'my-auto' : 'mt-0' ]
                : ['m-auto', imageLoaded ? 'h-gallery' : ''],
              { 'rendering-pixelated' : gameInfo.config.imageFiltering == false }
            ]"
          />
        </transition>
      </div>
      <div class="mx-auto max-w-max">
        <!-- Control bar. -->
        <hip-modal class="ml-8 p-gallery rounded-full">
          <div class="flex h-10 justify-between mx-1 space-x-2">
            <!-- Close dialog. -->
            <hip-button
              :icon="true"
              @click="viewImagesPicturesClose()"
              class="el-icon-circle-close text-2xl"
            ></hip-button>
            <!-- Control bar buttons. -->
            <div class="flex h-10 rounded-full shadow">
              <!-- Previous image. -->
              <hip-button-group
                firstElement
                @click="prevImage()"
                class="el-icon-d-arrow-left"
              ></hip-button-group>
              <!-- Display image in its original size. -->
              <hip-button-group
                @click="imageZoom = !imageZoom"
                class="el-icon-full-screen"
              ></hip-button-group>
              <!-- Next image. -->
              <hip-button-group
                lastElement
                @click="nextImage()"
                class="el-icon-d-arrow-right"
              ></hip-button-group>
            </div>
            <!-- Image counter. -->
            <hip-button class="cursor-default">{{ (imageIndex + 1) + ' / ' + getPictures.length }}</hip-button>
          </div>
        </hip-modal>
      </div>
    </hip-overlay>
  </transition>
  <!-- View gallery. -->
  <hip-overlay
    v-show="dialog.viewImagesGallery"
    @close="viewImagesGallery()"
    class="pos-initial z-10"
  >
    <!-- Header. -->
    <hip-modal
      v-if="getPictures[0]"
      class="mb-4 ml-auto p-gallery rounded-full"
    >
      <!-- Gallery buttons. -->
      <div class="flex h-10 justify-between mx-1">
        <!-- Padding. -->
        <hip-button
          :icon="true"
          class="el-icon-circle-close invisible"
        ></hip-button>
        <!-- Header title. -->
        <p class="pt-1 text-2xl">Gallery</p>
        <!-- Close dialog. -->
        <hip-button
          :icon="true"
          @click="viewImagesGallery()"
          class="el-icon-circle-close text-2xl"
        ></hip-button>
      </div>
    </hip-modal>
    <!-- Pictures grid. -->
    <div class="flex h-gallery max-h-gallery overflow-hidden rounded-xl">
      <div
        v-if="getPictures[0]"
        class="flex-1 no-scrollbar overflow-y-scroll"
      >
        <div class="gap-4 grid grid-cols-4">
          <div
            v-for="(image, index) in getPictures"
            :key="index"
            :value="image"
            class="flex h-full justify-center w-full"
          >
            <img
              @click="viewImagesPicturesOpen(index)"
              :src="'file://' + imagePath + '/' + image"
              class="cursor-pointer object-cover rounded-xl"
              :class="{ 'rendering-pixelated' : gameInfo.config.imageFiltering == false }"
            />
          </div>
        </div>
      </div>
      <div
        v-else
        class="flex flex-col items-center m-auto"
      >
        <hip-modal>
          <p>No images available.</p>
        </hip-modal>
      </div>
    </div>
  </hip-overlay>
  <!-- Cover image. -->
  <div class="ar-square justify-center w-full">
    <img
      ref="coverImage"
      v-if="getCover || getPictures[0]"
      @click="viewImagesCoverOpen()"
      @load="loadImage()"
      :src="'file://' + imagePath + '/' + (getCover ? getCover : getPictures[0])"
      class="cursor-pointer m-auto mb-4 object-contain rounded-md"
      :class="[
        renderReady ? coverWidth > coverHeight ? 'w-full' : 'h-full' : '',
        { 'rendering-pixelated' : gameInfo.config.imageFiltering == false && !getCover }
      ]"
    />
    <div
      v-else
      class="bg-theme-100 dark:bg-theme-800 border-2 border-theme-200 dark:border-theme-900 flex h-full items-center mb-4 rounded-md w-full"
    >
      <div class="flex flex-col items-center m-auto">
        <div class="el-icon-picture text-6xl mb-4 text-theme-300"></div>
        <p>No image available</p>
      </div>
    </div>
    <!-- Open gallery. -->
    <div class="flex w-full">
      <hip-button
        :large="true"
        @click="viewImagesGallery()"
      >Gallery</hip-button>
    </div>
  </div>
</template>

<script>
// Import functions from modules.
import { app } from '@electron/remote'
import {
  existsSync,
  readdirSync
} from 'fs-extra'
// Import UI components.
import {
  HipButton,
  HipButtonGroup,
  HipModal,
  HipOverlay
} from '../../Component'

export default {
  name: 'ViewGameImages',
  components: {
    // UI components.
    HipButton,
    HipButtonGroup,
    HipModal,
    HipOverlay
  },
  data() {
    return {
      coverWidth: 0,
      coverHeight: 0,
      imageIndex: null,
      imageFiles: [],
      imagePath: null,
      imageZoom: false,
      imageCenter: false,
      imageLoaded: false,
      renderReady: false,
      slideBack: false,
      dialog: {
        viewImagesGallery: false,
        viewImagesCover: false,
        viewImagesPictures: false
      }
    }
  },
  props: [
    'gameInfo',
    'regionIndex',
    'versionIndex'
  ],
  methods: {
    // Images management.
    getImages() {
      // Store currently selected cover image.
      let coverOld = this.getCover ? this.getCover : this.getPictures[0]
      // Set the image directory path of the game platform.
      let gamePath = app.getAppPath() + '/data/' + this.gameInfo.platform._id + '/' + this.gameInfo._id
      // Check if there are images for the selected game version.
      this.imagePath = gamePath + '/' + this.gameInfo.gameRegions[this.regionIndex]._id + '/games/' + this.gameInfo.gameRegions[this.regionIndex].gameVersions[this.versionIndex]._id + '/images'
      if (existsSync(this.imagePath) && readdirSync(this.imagePath).length > 0) {
        // Load images filenames.
        this.imageFiles = readdirSync(this.imagePath)
      }
      else {
        // Check if there are images for the selected game region.
        this.imagePath = gamePath + '/' + this.gameInfo.gameRegions[this.regionIndex]._id + '/images'
        if (existsSync(this.imagePath) && readdirSync(this.imagePath).length > 0) {
          // Load images filenames.
          this.imageFiles = readdirSync(this.imagePath)
        }
        else {
          // Check if there are images for the selected game platform.
          this.imagePath = gamePath + '/images'
          if (existsSync(this.imagePath) && readdirSync(this.imagePath).length > 0) {
            // Load images filenames.
            this.imageFiles = readdirSync(this.imagePath)
          }
          else {
            // Empty image variables.
            this.imagePath = null
            this.imageFiles = []
          }
        }
      }
      // Store newly selected cover image.
      let coverNew = this.getCover ? this.getCover : this.getPictures[0]
      // Disable the image resizing.
      if (coverOld != coverNew) {
        this.renderReady = false
      }
    },
    loadImage() {
      // Get image width and height.
      this.coverWidth = this.$refs.coverImage.clientWidth
      this.coverHeight = this.$refs.coverImage.clientHeight
      // Enable the image resizing.
      this.renderReady = true
    },
    nextImage() {
      if (this.imageIndex < this.getPictures.length - 1) {
        // Unload image.
        this.imageLoaded = false
        // Set sliding transition orientation.
        this.slideBack = false
        // Increase image index.
        this.imageIndex++
      }
    },
    prevImage() {
      if (this.imageIndex > 0) {
        // Unload image.
        this.imageLoaded = false
        // Set sliding transition orientation.
        this.slideBack = true
        // Decrease image index.
        this.imageIndex--
      }
    },
    // View images.
    viewImagesGallery() {
      // Open gallery.
      this.dialog.viewImagesGallery = !this.dialog.viewImagesGallery
    },
    viewImagesCoverOpen() {
      // Reset zoom mode.
      this.imageZoom = false
      // Open cover view.
      this.dialog.viewImagesCover = !this.dialog.viewImagesCover
    },
    viewImagesCoverClose() {
      // Close cover view.
      this.dialog.viewImagesCover = !this.dialog.viewImagesCover
    },
    viewImagesPicturesOpen(index) {
      // Set selected image.
      this.imageIndex = index
      // Reset zoom mode.
      this.imageZoom = false
      // Open pictures view.
      this.dialog.viewImagesPictures = !this.dialog.viewImagesPictures
    },
    viewImagesPicturesClose() {
      // Unload image.
      this.imageLoaded = false
      // Empty selected image.
      this.imageIndex = null
      // Close pictures view.
      this.dialog.viewImagesPictures = !this.dialog.viewImagesPictures
    },
    viewImagesPicturesLoad() {
      // Determine centering by the image's height.
      this.imageCenter = (this.$refs.pictureImage.clientHeight < this.$refs.imageContainer.clientHeight) ? true : false
      // Load image.
      this.imageLoaded = true
    }
  },
  mounted() {
    // Load images.
    this.getImages()
  },
  computed: {
    getCover() {
      // Get cover image.
      return this.imageFiles.filter(res => res.startsWith('0'.repeat(8)))[0]
    },
    getPictures() {
      // Get array of pictures.
      return this.imageFiles.filter(res => !res.startsWith('0'.repeat(8)))
    }
  },
  watch: {
    // Watch for game region selection changes.
    regionIndex() {
      // Load images.
      this.getImages()
    },
    // Watch for game version selection changes.
    versionIndex() {
      // Load images.
      this.getImages()
    }
  }
}
</script>

<style scoped>
/* Calculations. */
.h-cover {
  height: calc(100vh - 4rem);
}
.h-gallery {
  height: calc(100vh - 9.2rem);
}
.max-h-gallery {
  max-height: calc(100vh - 9.2rem);
}
.p-gallery {
  padding: 0.8rem;
}
.w-gallery {
  width: calc(100vw - 7.5rem);
}
/* Styling. */
.rendering-pixelated {
  image-rendering: pixelated;
}
</style>