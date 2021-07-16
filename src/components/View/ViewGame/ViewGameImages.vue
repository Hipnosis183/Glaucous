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
      v-if="imagesPictures[imageIndex]"
      v-show="dialog.viewImagesPictures"
      @close="viewImagesPicturesClose()"
      class="top-0 left-14 z-10"
    >
      <div class="flex h-image overflow-y-scroll no-scrollbar rounded-xl mb-4">
        <img
          @click="viewImagesPicturesClose()"
          :src="'file://' + imagesPath + '/' + imagesPictures[imageIndex]"
          class="cursor-pointer object-contain rounded-xl m-auto transition-all ease-in-out duration-1000 transform translate-x-0"
          :class="imagesZoom ? 'h-auto' : 'h-image'"
        />
      </div>
      <div class="flex ml-14">
        <div class="bg-indigo-600 p-2 w-10 text-center rounded-xl ml-auto my-auto">
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
            @click="imagesZoom = !imagesZoom"
            class="el-icon-full-screen text-2xl"
          ></button>
          <button
            @click="nextImage()"
            class="el-icon-d-arrow-right text-2xl"
          ></button>
        </div>
        <div class="bg-indigo-600 p-2 w-24 text-center rounded-xl mr-auto my-auto">
          <p class="text-gray-200 text-xl">{{ (imageIndex + 1) + ' / ' + imagesPictures.length }}</p>
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
          @click="viewImagesPicturesOpen(index)"
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
      imageIndex: null,
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
    nextImage() {
      // Increase image index.
      if (this.imageIndex < this.imagesPictures.length - 1) {
        this.imageIndex++
      }
    },
    prevImage() {
      // Decrease image index.
      if (this.imageIndex > 0) {
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
      this.imagesZoom = false
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
      this.imagesZoom = false
      // Open pictures view.
      this.dialog.viewImagesPictures = !this.dialog.viewImagesPictures
    },
    viewImagesPicturesClose() {
      // Empty selected image.
      this.imageIndex = null
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
.h-image {
  height: calc(100vh - 8rem);
}
</style>
