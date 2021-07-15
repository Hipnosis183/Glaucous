<template>
  <!-- View cover image. -->
  <hip-overlay
    v-if="imagesPath"
    v-show="dialog.viewImagesCover"
    @close="viewImagesCoverClose()"
    class="top-0 left-14"
  >
    <div class="flex">
      <img
        @click="imagesZoom = !imagesZoom"
        :src="'file://' + imagesPath + '/' + (imagesCover ? imagesCover : imagesPictures[0])"
        class="cursor-pointer object-contain rounded-xl"
        :class="imagesZoom ? 'h-full' : 'h-content'"
      />
    </div>
  </hip-overlay>
  <!-- View selected picture. -->
  <transition>
    <hip-overlay
      v-if="imageFile"
      v-show="dialog.viewImagesPictures"
      @close="viewImagesPicturesClose()"
      class="top-0 left-14 z-10"
    >
      <div class="flex">
        <img
          @click="imagesZoom = !imagesZoom"
          :src="'file://' + imagesPath + '/' + imageFile"
          class="cursor-pointer object-contain rounded-xl"
          :class="imagesZoom ? 'h-full' : 'h-content'"
        />
      </div>
    </hip-overlay>
  </transition>
  <!-- View gallery. -->
  <hip-overlay
    v-show="dialog.viewImagesGallery"
    @close="viewImagesGallery()"
    class="top-0 left-14"
  >
    <div
      v-if="imagesPath"
      class="grid grid-cols-4 gap-4"
    >
      <div
        v-for="(image, index) in imagesPictures"
        :key="index"
        :value="image"
        class="w-full h-full flex justify-center"
      >
        <img
          @click="viewImagesPicturesOpen(image)"
          :src="'file://' + imagesPath + '/' + image"
          class="cursor-pointer object-cover rounded-xl"
        />
      </div>
    </div>
    <hip-modal v-else>
      <p>No images available.</p>
    </hip-modal>
  </hip-overlay>
  <div class="w-full ar-square justify-center">
    <img
      ref="coverImage"
      v-if="imagesCover || imagesPictures[0]"
      @click="viewImagesCoverOpen()"
      @load="renderReady = true"
      :src="'file://' + imagesPath + '/' + (imagesCover ? imagesCover : imagesPictures[0])"
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
import { app } from '@electron/remote'
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
      imageFile: null,
      imageFiles: [],
      imagesPath: null,
      imagesZoom: false,
      renderReady: false,
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
      this.imagesPath = app.getAppPath() + '/images/' + this.gameInfo._id + '/' + this.gameInfo.gameRegions[this.regionIndex]._id
      if (existsSync(this.imagesPath)) {
        // Load images filenames.
        this.imageFiles = readdirSync(this.imagesPath)
      }
      else {
        // Empty image variables.
        this.imagesPath = null
        this.imageFiles = []
      }
    },
    // View images.
    viewImagesGallery() {
      // Open gallery.
      this.dialog.viewImagesGallery = !this.dialog.viewImagesGallery
    },
    viewImagesCoverOpen() {
      // Reset zoom mode.
      this.imagesZoom = false
      // Open cover view.
      this.dialog.viewImagesCover = !this.dialog.viewImagesCover
    },
    viewImagesCoverClose() {
      // Close cover view.
      this.dialog.viewImagesCover = !this.dialog.viewImagesCover
    },
    viewImagesPicturesOpen(img) {
      // Set selected image.
      this.imageFile = img
      // Reset zoom mode.
      this.imagesZoom = false
      // Open pictures view.
      this.dialog.viewImagesPictures = !this.dialog.viewImagesPictures
    },
    viewImagesPicturesClose() {
      // Empty selected image.
      this.imageFile = null
      // Close pictures view.
      this.dialog.viewImagesPictures = !this.dialog.viewImagesPictures
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
    imagesCover() {
      // Get cover image.
      return this.imageFiles.filter(res => res == '0'.repeat(16))[0]
    },
    imagesPictures() {
      // Get array of pictures.
      return this.imageFiles.filter(res => res != '0'.repeat(16))
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

<style>
</style>
