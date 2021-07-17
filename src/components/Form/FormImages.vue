<template>
  <!-- Show images dialog. -->
  <hip-dialog
    v-show="dialog.viewImages"
    class="top-0 left-14 z-10"
    @close="viewImages()"
  >
  </hip-dialog>
  <!-- Comment form. -->
  <p class="text-sm text-gray-600 leading-10 -mb-1">Images</p>
  <el-button-group class="w-full">
    <el-button
      class="w-1/2"
      @click="selectCover()"
    >Cover</el-button>
    <el-button
      class="w-1/2"
      @click="selectPictures()"
    >Pictures</el-button>
  </el-button-group>
</template>

<script>
import {
  HipButton,
  HipDialog
} from '../Component'

import { dialog } from '@electron/remote'

export default {
  name: 'FormImages',
  components: {
    HipButton,
    HipDialog
  },
  data() {
    return {
      dialog: {
        viewImages: false
      }
    }
  },
  methods: {
    // Images management.
    getImages() {
    },
    selectCover() {
      this.cover = dialog.showOpenDialogSync({
        properties: [
          'openFile'
        ],
        filters: [{
          name: 'Images',
          extensions: ['bmp', 'jpg', 'png']
        }]
      })
    },
    selectPictures() {
      this.pictures = dialog.showOpenDialogSync({
        properties: [
          'openFile',
          'multiSelections'
        ],
        filters: [{
          name: 'Images',
          extensions: ['bmp', 'jpg', 'png']
        }]
      })
    },
    addImages() {
      // Save image into the store.
      this.$store.commit('setGameRegionImagesAdd', this.image)
      // Reset image input.
      this.image = null
    },
    removeImage(com) {
      // Remove image from the store.
      this.$store.commit('setGameRegionImagesRemove', com)
    },
    viewImages() {
      // Open images dialog.
      this.dialog.viewImages = !this.dialog.viewImages
    }
  },
  computed: {
    cover: {
      get() { return this.$store.state.gameForm.gameRegion.images.cover },
      set(value) { this.$store.commit('setGameRegionImagesCover', value) }
    },
    pictures: {
      get() { return this.$store.state.gameForm.gameRegion.images.pictures },
      set(value) { this.$store.commit('setGameRegionImagesPictures', value) }
    }
  }
}
</script>

<style>
.el-button {
  font-weight: normal;
}
</style>
