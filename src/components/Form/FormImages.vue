<template>
  <!-- Show images dialog. -->
  <hip-overlay
    v-show="dialog.viewImages"
    @close="viewImagesClose()"
    class="pos-initial z-10"
  >
    <div class="flex space-x-4 w-images">
      <!-- Cover panel. -->
      <hip-modal class="max-h-content w-1/4">
        <!-- Cover header. -->
        <div class="flex justify-between mb-6 mx-2">
          <!-- Cover title. -->
          <p class="pt-1 text-2xl">Cover</p>
          <!-- Cover buttons. -->
          <div class="flex h-10 space-x-4">
            <hip-button
              :icon="true"
              @click="addCover()"
              class="el-icon-circle-plus-outline text-2xl"
            ></hip-button>
            <hip-button
              :icon="true"
              @click="removeCover()"
              class="el-icon-remove-outline text-2xl"
            ></hip-button>
          </div>
        </div>
        <!-- Cover image. -->
        <img
          v-if="imagesCoverAdd"
          :src="'file://' + imagesCoverAdd"
          class="object-cover rounded-xl shadow"
        />
        <img
          v-else-if="getCover && !imagesCoverRemove"
          :src="'file://' + imagePath + '/' + getCover"
          class="object-cover rounded-xl shadow"
        />
        <div
          v-else
          class="ar-square bg-theme-100 dark:bg-theme-800 flex items-center rounded-xl shadow w-full"
        >
          <div class="flex flex-col items-center m-auto">
            <div class="el-icon-picture mb-4 text-6xl text-theme-300"></div>
            <p>No image available</p>
          </div>
        </div>
        <!-- Back button. -->
        <hip-button
          :large="true"
          @click="viewImagesClose()"
          class="mt-6"
        >Back</hip-button>
      </hip-modal>
      <!-- Pictures panel. -->
      <hip-modal class="h-content max-h-content w-3/4">
        <!-- Pictures header. -->
        <div class="flex justify-between mb-6 mx-2">
          <!-- Pictures title. -->
          <p class="pt-1 text-2xl">Pictures</p>
          <!-- Pictures buttons. -->
          <div class="flex h-10 space-x-4">
            <hip-button
              :icon="true"
              @click="addPicturesAdd()"
              class="el-icon-circle-plus-outline text-2xl"
            ></hip-button>
          </div>
        </div>
        <!-- Pictures grid. -->
        <div class="flex flex-1 max-h-images overflow-hidden rounded-xl">
          <div
            v-if="getPictures[0] || imagesPicturesAdd[0]"
            class="flex-1 no-scrollbar overflow-y-scroll"
          >
            <div class="gap-4 grid grid-cols-4">
              <div
                v-for="(image, index) in getPictures"
                :key="index"
                :value="image"
                class="flex h-full justify-center relative rounded-xl shadow w-full"
              >
                <transition>
                  <div
                    v-show="toDelete(image)"
                    @click="selectPicturesRemove(image)"
                    class="absolute bg-red-800 bg-opacity-50 cursor-pointer flex h-full rounded-xl w-full"
                  >
                    <div class="el-icon-remove-outline m-auto text-6xl text-theme-100" />
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
                class="flex h-full justify-center relative rounded-xl shadow w-full"
              >
                <transition>
                  <div
                    @click="removePicturesAdd(image)"
                    class="absolute bg-green-800 bg-opacity-50 cursor-pointer flex h-full rounded-xl w-full"
                  >
                    <div class="el-icon-circle-plus-outline m-auto text-6xl text-theme-100" />
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
            class="bg-theme-100 dark:bg-theme-800 flex h-images items-center rounded-xl shadow w-full"
          >
            <div class="flex flex-col items-center m-auto">
              <div class="el-icon-picture mb-4 text-6xl text-theme-300"></div>
              <p>No images available</p>
            </div>
          </div>
        </div>
      </hip-modal>
    </div>
  </hip-overlay>
  <!-- Images form. -->
  <hip-input-button
    :icon="true"
    @click="viewImagesOpen()"
    class="el-icon-picture rounded-xl shadow text-2xl"
  ></hip-input-button>
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
  HipDialog,
  HipInputButton,
  HipModal,
  HipOverlay
} from '../Component'

export default {
  name: 'FormImages',
  components: {
    // UI components.
    HipButton,
    HipDialog,
    HipInputButton,
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
      this.imagePath = app.getAppPath() + '/data/' + this.$store.state.gameForm.gamePlatform.platform + '/' + this.$store.state.gameSelected.gamePlatform + '/' + this.$store.state.gameSelected.gameRegion + '/images'
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

<style scoped>
/* Calculations. */
.h-images {
  height: calc(100vh - 11rem);
}
.max-h-content {
  max-height: calc(100vh - 4rem);
}
.max-h-images {
  max-height: calc(100vh - 11rem);
}
.w-images {
  width: calc(100vw - 7.5rem);
}
</style>