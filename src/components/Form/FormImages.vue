<template>
  <!-- Show images dialog. -->
  <hip-overlay
    v-show="dialog.viewImages"
    class="top-0 left-14 z-10"
    @close="viewImagesClose()"
  >
    <div class="w-images flex space-x-4">
      <!-- Cover panel. -->
      <hip-modal class="w-1/4 max-h-content">
        <!-- Cover header. -->
        <div class="flex justify-between mb-6 mx-2">
          <!-- Cover title. -->
          <h1 class="text-2xl pt-1">Cover</h1>
          <!-- Cover buttons. -->
          <div class="flex h-10 space-x-4">
            <hip-button
              class="el-icon-circle-plus-outline text-2xl"
              @click="addCover()"
              :icon="true"
            ></hip-button>
            <hip-button
              class="el-icon-remove-outline text-2xl"
              @click="removeCover()"
              :icon="true"
            ></hip-button>
          </div>
        </div>
        <!-- Cover image. -->
        <img
          v-if="imagesCoverAdd"
          :src="'file://' + imagesCoverAdd"
          class="object-cover rounded-xl border-2 border-gray-200"
        />
        <img
          v-else-if="getCover && !imagesCoverRemove"
          :src="'file://' + imagePath + '/' + getCover"
          class="object-cover rounded-xl border-2 border-gray-200"
        />
        <div
          v-else
          class="flex w-full ar-square items-center rounded-xl border-2 border-gray-200"
        >
          <div class="flex flex-col items-center m-auto">
            <i class="el-icon-document-delete text-6xl text-gray-300 mb-4"></i>
            <p>No image available</p>
          </div>
        </div>
        <!-- Back button. -->
        <hip-button
          class="mt-6"
          @click="viewImagesClose()"
          :large="true"
        >Back</hip-button>
      </hip-modal>
      <!-- Pictures panel. -->
      <hip-modal class="w-3/4 h-content max-h-content">
        <!-- Pictures header. -->
        <div class="flex justify-between mb-6 mx-2">
          <!-- Pictures title. -->
          <h1 class="text-2xl pt-1">Pictures</h1>
          <!-- Pictures buttons. -->
          <hip-button
            class="el-icon-circle-plus-outline text-2xl"
            @click="addPicturesAdd()"
            :icon="true"
          ></hip-button>
        </div>
        <!-- Pictures grid. -->
        <div class="max-h-images flex-1 flex overflow-hidden rounded-xl">
          <div
            v-if="getPictures[0] || imagesPicturesAdd[0]"
            class="flex-1 overflow-y-scroll no-scrollbar"
          >
            <div class="grid grid-cols-4 gap-4">
              <div
                v-for="(image, index) in getPictures"
                :key="index"
                :value="image"
                class="w-full h-full flex justify-center relative rounded-xl border-2 border-gray-200"
              >
                <transition>
                  <div
                    v-show="toDelete(image)"
                    class="absolute flex bg-red-800 bg-opacity-50 w-full h-full cursor-pointer rounded-xl"
                    @click="selectPicturesRemove(image)"
                  >
                    <div class="el-icon-remove-outline text-6xl text-gray-200 m-auto" />
                  </div>
                </transition>
                <img
                  @click="selectPicturesRemove(image)"
                  :src="'file://' + imagePath + '/' + image"
                  class="cursor-pointer object-cover rounded-xl"
                />
              </div>
              <div
                v-for="(image, index) in imagesPicturesAdd"
                :key="index"
                :value="image"
                class="w-full h-full flex justify-center relative rounded-xl border-2 border-gray-200"
              >
                <transition>
                  <div
                    class="absolute flex bg-green-800 bg-opacity-50 w-full h-full cursor-pointer rounded-xl"
                    @click="removePicturesAdd(image)"
                  >
                    <div class="el-icon-circle-plus-outline text-6xl text-gray-200 m-auto" />
                  </div>
                </transition>
                <img
                  :src="'file://' + image"
                  class="cursor-pointer object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
          <div
            v-else
            class="flex w-full h-images items-center rounded-xl border-2 border-gray-200"
          >
            <div class="flex flex-col items-center m-auto">
              <i class="el-icon-document-delete text-6xl text-gray-300 mb-4"></i>
              <p>No images available</p>
            </div>
          </div>
        </div>
      </hip-modal>
    </div>
  </hip-overlay>
  <!-- Images form. -->
  <p class="text-sm text-gray-600 leading-10 -mb-1">Images</p>
  <el-button-group class="w-full">
    <el-button
      class="w-2/5"
      @click="addCover()"
    >Cover</el-button>
    <el-button
      class="w-2/5"
      @click="addPicturesAdd()"
    >Pictures</el-button>
    <el-button
      class="w-1/5 el-icon-picture-outline"
      @click="viewImagesOpen()"
    ></el-button>
  </el-button-group>
</template>

<script>
// Import functions from modules.
import {
  app,
  dialog
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
} from '../Component'

export default {
  name: 'FormImages',
  components: {
    HipButton,
    HipModal,
    HipOverlay
  },
  data() {
    return {
      imageFiles: [],
      imagePath: null,
      dialog: {
        viewImages: false
      }
    }
  },
  methods: {
    // Images management.
    getImages() {
      // Set the image directory path of the game region.
      this.imagePath = app.getAppPath() + '/images/' + this.$store.state.gameSelected.gamePlatform + '/' + this.$store.state.gameSelected.gameRegion
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
    addCover() {
      // Open dialog to select an image.
      this.imagesCoverAdd = dialog.showOpenDialogSync({
        properties: [
          'openFile'
        ],
        filters: [{
          name: 'Images',
          extensions: ['bmp', 'jpg', 'png']
        }]
      })
    },
    removeCover() {
      // Remove image from the store.
      this.imagesCoverAdd = null
      this.imagesCoverRemove = true
    },
    addPicturesAdd() {
      // Open dialog to select images.
      let dialogResult = dialog.showOpenDialogSync({
        properties: [
          'openFile',
          'multiSelections'
        ],
        filters: [{
          name: 'Images',
          extensions: ['bmp', 'jpg', 'png']
        }]
      })
      if (dialogResult) {
        // Save images into the store.
        dialogResult.forEach(res => this.imagesPicturesAdd = res)
      }
    },
    removePicturesAdd(image) {
      // Remove image from the store.
      this.imagesPicturesAdd.splice(this.imagesPicturesAdd.indexOf(image), 1)
    },
    selectPicturesRemove(image) {
      if (this.toDelete(image)) {
        // Remove image from the delete list.
        this.imagesPicturesRemove.splice(this.imagesPicturesRemove.indexOf(image), 1)
      } else {
        // Add image to the delete list.
        this.imagesPicturesRemove = image
      }
    },
    toDelete(image) {
      // Check if the image is in the delete list.
      return this.imagesPicturesRemove.includes(image)
    },
    // View images.
    viewImagesOpen() {
      // Load images.
      this.getImages()
      // Open images dialog.
      this.dialog.viewImages = !this.dialog.viewImages
    },
    viewImagesClose() {
      // Close images dialog.
      this.dialog.viewImages = !this.dialog.viewImages
    }
  },
  computed: {
    getCover() {
      // Get cover image.
      return this.imageFiles.filter(res => res.startsWith('0'.repeat(8)))[0]
    },
    getPictures() {
      // Get array of pictures.
      return this.imageFiles.filter(res => !res.startsWith('0'.repeat(8)))
    },
    imagesCoverAdd: {
      get() { return this.$store.state.gameForm.gameRegion.images.cover.add },
      set(value) { this.$store.commit('setGameRegionImagesCoverAdd', value) }
    },
    imagesCoverRemove: {
      get() { return this.$store.state.gameForm.gameRegion.images.cover.remove },
      set(value) { this.$store.commit('setGameRegionImagesCoverRemove', value) }
    },
    imagesPicturesAdd: {
      get() { return this.$store.state.gameForm.gameRegion.images.pictures.add },
      set(value) { this.$store.commit('setGameRegionImagesPicturesAdd', value) }
    },
    imagesPicturesRemove: {
      get() { return this.$store.state.gameForm.gameRegion.images.pictures.remove },
      set(value) { this.$store.commit('setGameRegionImagesPicturesRemove', value) }
    }
  }
}
</script>

<style>
.el-button {
  font-weight: normal;
}

.max-h-content {
  max-height: calc(100vh - 4rem);
}
.max-h-images {
  max-height: calc(100vh - 11rem);
}
.h-images {
  height: calc(100vh - 11rem);
}
.w-images {
  width: calc(100vw - 7.5rem);
}
</style>
