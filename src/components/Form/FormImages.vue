<template>
  <!-- Show images dialog. -->
  <hip-dialog
    v-show="dialog.viewImages"
    class="top-0 left-14 z-10"
    @close="viewImages()"
  >
  </hip-dialog>
  <!-- Comment form. -->
  <hip-button @click="getImages()">Images</hip-button>
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
      this.images = dialog.showOpenDialogSync({
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
    images: {
      get() { return this.$store.state.gameForm.gameRegion.images },
      set(value) { this.$store.commit('setGameRegionImages', value) }
    }
  }
}
</script>

<style>
</style>
