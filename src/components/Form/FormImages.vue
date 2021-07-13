<template>
  <!-- Show images dialog. -->
  <hip-dialog
    v-show="dialog.viewImages"
    class="top-0 left-14 z-10"
    @close="viewImages()"
  >
  </hip-dialog>
  <!-- Comment form. -->
  <hip-button @click="selectCover()">Cover</hip-button>
  <hip-button @click="selectPictures()">Pictures</hip-button>
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
</style>
