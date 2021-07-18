<template>
  <!-- View cover image. -->
  <hip-overlay
    v-if="getCover"
    v-show="dialog.viewImagesCover"
    @close="viewImagesCoverClose()"
    class="top-0 left-14"
  >
    <div class="flex">
      <img
        @click="imageZoom = !imageZoom"
        :src="'file://' + imagePath + '/' + getCover"
        class="cursor-pointer object-contain rounded-xl"
        :class="imageZoom ? 'h-full' : 'h-content'"
      />
    </div>
  </hip-overlay>
  <!-- View selected picture. -->
  <transition>
    <hip-overlay
      v-if="getPictures[imageIndex]"
      v-show="dialog.viewImagesPictures"
      @close="viewImagesPicturesClose()"
      class="top-0 left-14 z-10"
    >
      <div
        ref="imageContainer"
        class="relative w-image h-image overflow-y-scroll no-scrollbar rounded-xl mb-4"
      >
        <transition
          :name="slideBack ? 'slide-b' : 'slide-f'"
          class="absolute top-0 bottom-0 left-0 right-0 rounded-xl"
        >
          <img
            ref="pictureImage"
            :key="imageIndex"
            @click="viewImagesPicturesClose()"
            @load="viewImagesPicturesLoad()"
            :src="'file://' + imagePath + '/' + getPictures[imageIndex]"
            class="object-contain rounded-xl"
            :class="imageZoom ? ['h-auto mx-auto', imageCenter ? 'my-auto' : 'mt-0' ] : ['m-auto', imageLoaded ? 'h-image' : '']"
          />
        </transition>
      </div>
      <div class="flex ml-14">
        <div class="bg-indigo-600 p-2 h-10 text-center rounded-xl ml-auto my-auto">
          <button
            @click="viewImagesPicturesClose()"
            class="el-icon-close text-2xl text-gray-200"
          ></button>
        </div>
        <div class="bg-gray-200 p-3 w-40 rounded-xl shadow mx-4 flex justify-between">
          <button
            @click="prevImage()"
            class="el-icon-d-arrow-left text-2xl"
          ></button>
          <button
            @click="imageZoom = !imageZoom"
            class="el-icon-full-screen text-2xl"
          ></button>
          <button
            @click="nextImage()"
            class="el-icon-d-arrow-right text-2xl"
          ></button>
        </div>
        <div class="bg-indigo-600 p-2 w-24 text-center rounded-xl mr-auto my-auto">
          <p class="text-gray-200 text-xl">{{ (imageIndex + 1) + ' / ' + getPictures.length }}</p>
        </div>
      </div>
    </hip-overlay>
  </transition>
  <!-- View gallery. -->
  <hip-overlay
    v-show="dialog.viewImagesGallery"
    @close="viewImagesGallery()"
    class="top-0 left-14"
  >
    <!-- Header. -->
    <hip-modal
      v-if="getPictures[0]"
      class="rounded-full p-image ml-auto mb-4"
    >
      <!-- Gallery buttons. -->
      <div class="flex h-10 justify-between mx-1">
        <!-- Open images folder. -->
        <hip-button
          class="el-icon-folder-opened text-2xl"
          @click="viewImagesFolder()"
          :icon="true"
        ></hip-button>
        <!-- Header title. -->
        <p class="text-2xl pt-1">Gallery</p>
        <!-- Close dialog. -->
        <hip-button
          class="el-icon-circle-close text-2xl"
          @click="viewImagesGallery()"
          :icon="true"
        ></hip-button>
      </div>
    </hip-modal>
    <!-- Pictures grid. -->
    <div class="h-image max-h-images flex-1 flex overflow-hidden rounded-xl">
      <div
        v-if="getPictures[0]"
        class="flex-1 overflow-y-scroll no-scrollbar"
      >
        <div class="grid grid-cols-4 gap-4">
          <div
            v-for="(image, index) in getPictures"
            :key="index"
            :value="image"
            class="w-full h-full flex justify-center"
          >
            <img
              @click="viewImagesPicturesOpen(index)"
              :src="'file://' + imagePath + '/' + image"
              class="cursor-pointer object-cover rounded-xl"
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
  <div class="w-full ar-square justify-center">
    <img
      ref="coverImage"
      v-if="getCover"
      @click="viewImagesCoverOpen()"
      @load="renderReady = true"
      :src="'file://' + imagePath + '/' + getCover"
      class="cursor-pointer m-auto mb-4 object-contain rounded-md border-2 border-gray-200"
      :class="renderReady ? coverWidth > coverHeight ? 'w-full' : 'h-full' : ''"
    />
    <div
      v-else
      class="flex w-full h-full mb-4 rounded-md border-2 border-gray-200 items-center"
    >
      <div class="flex flex-col items-center m-auto">
        <i class="el-icon-document-delete text-6xl text-gray-300 mb-4"></i>
        <p>No image available</p>
      </div>
    </div>
    <div class="w-full flex">
      <hip-button
        :large="true"
        @click="viewImagesGallery()"
      >Gallery</hip-button>
    </div>
  </div>
</template>

<script>
// Import functions from modules.
import {
  app,
  shell
} from '@electron/remote'
import {
  existsSync,
  readdirSync
} from 'fs-extra'
// Import UI components.
import {
  HipButton,
  HipModal,
  HipOverlay
} from '../../Component'

export default {
  name: 'ViewGameImages',
  components: {
    // UI components.
    HipButton,
    HipModal,
    HipOverlay
  },
  props: [
    'gameInfo',
    'regionIndex'
  ],
  data() {
    return {
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
  methods: {
    // Images management.
    getImages() {
      // Set the image directory path of the game region.
      this.imagePath = app.getAppPath() + '/images/' + this.gameInfo._id + '/' + this.gameInfo.gameRegions[this.regionIndex]._id
      if (existsSync(this.imagePath)) {
        // Load images filenames.
        this.imageFiles = readdirSync(this.imagePath)
      }
      else {
        // Empty image variables.
        this.imagePath = null
        this.imageFiles = []
      }
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
    },
    viewImagesFolder() {
      // Open images location path in the file manager.
      shell.openPath(this.imagePath)
    }
  },
  mounted() {
    // Load images.
    this.getImages()
  },
  computed: {
    coverWidth() {
      // Dynamically get parent's width.
      return this.$refs.coverImage.clientWidth
    },
    coverHeight() {
      // Dynamically get parent's height.
      return this.$refs.coverImage.clientHeight
    },
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
    }
  }
}
</script>

<style scoped>
.p-image {
  padding: 0.8rem;
}
.h-image {
  height: calc(100vh - 9.2rem);
}
.w-image {
  width: calc(100vw - 7.5rem);
}
.max-h-images {
  max-height: calc(100vh - 9.2rem);
}

.slide-b-leave-active,
.slide-b-enter-active {
  transition: 0.5s;
}
.slide-b-enter-from {
  transform: translate(-100vw, 0);
}
.slide-b-leave-to {
  transform: translate(100vw, 0);
}

.slide-f-leave-active,
.slide-f-enter-active {
  transition: 0.5s;
}
.slide-f-enter-from {
  transform: translate(100vw, 0);
}
.slide-f-leave-to {
  transform: translate(-100vw, 0);
}
</style>
