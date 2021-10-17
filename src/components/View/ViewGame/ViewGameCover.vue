<template>
  <!-- View full-size cover image. -->
  <vi-overlay
    v-if="getCover"
    v-show="imagesCoverDialog"
    @close="imagesCoverClose()"
    class="pos-initial z-10"
  >
    <div class="flex">
      <img
        @click="imageZoomToggle()"
        :src="'file://' + imagePath + '/' + getCover"
        class="cursor-pointer object-contain rounded-xl"
        :class="imageZoom ? 'h-full' : 'h-cover'"
      />
    </div>
  </vi-overlay>
  <!-- View cover image. -->
  <div
    class="ml-auto p-8 pb-0 relative"
    :style="'height:' + imageHeight"
  >
    <!-- Cover overlay. -->
    <div
      @mouseenter="coverHover = true"
      @mouseleave="coverHover = false"
      @click="imagesCoverOpen()"
      class="absolute border-2 border-transparent hover:border-color-400 dark:hover:border-color-900 bottom-0 cursor-pointer duration-200 left-0 m-8 mb-0 right-0 rounded-list hover:scale-102 top-0 transform z-5"
    />
    <!-- Cover image. -->
    <transition>
      <img
        v-if="getCover"
        v-show="renderReady"
        @load="resizeImage()"
        :src="'file://' + imagePath + '/' + getCover"
        class="duration-200 flex h-full rounded-list transform w-max"
        :class="{ 'scale-102' : coverHover }"
      />
    </transition>
  </div>
</template>

<script>
// Import Vue functions.
import { onUnmounted, computed, onMounted, ref, watch } from 'vue'
// Import functions from modules.
import { app } from '@electron/remote'
import { existsSync, readdirSync } from 'fs-extra'

export default {
  name: 'ViewGameCover',
  props: {
    coverHeight: { type: Function },
    gameInfo: { type: Object },
    regionIndex: { type: Number },
    versionIndex: { type: Number }
  },
  setup(props) {
    // Load game images on mounting.
    onMounted(() => { getImages() })

    // Watch for game selection changes.
    watch(() => [props.regionIndex, props.versionIndex], () => { getImages() })

    // Image reading operations.
    let imageFiles = ref([])
    let imagePath = ref(null)
    const getCover = computed(() => {
      // Get cover image.
      return imageFiles.value.filter(res => res.startsWith('0'.repeat(8)))[0]
    })
    const getPictures = computed(() => {
      // Get array of pictures.
      return imageFiles.value.filter((res) => !res.startsWith('0'.repeat(8)) && !res.startsWith('1'.repeat(8)))
    })
    const getImages = () => {
      // Store currently selected cover image.
      let coverOld = getCover.value ? getCover.value : getPictures.value[0]
      // Set the image directory path of the game platform.
      let gamePath = app.getAppPath() + '/data/' + props.gameInfo.platform._id + '/' + props.gameInfo._id
      // Check if there are images for the selected game version.
      imagePath.value = gamePath + '/games/' + props.gameInfo.gameRegions[props.regionIndex]._id + '/games/' + props.gameInfo.gameRegions[props.regionIndex].gameVersions[props.versionIndex]._id + '/images'
      if (existsSync(imagePath.value) && readdirSync(imagePath.value).length > 0) {
        // Load images filenames.
        imageFiles.value = readdirSync(imagePath.value)
      }
      else {
        // Check if there are images for the selected game region.
        imagePath.value = gamePath + '/games/' + props.gameInfo.gameRegions[props.regionIndex]._id + '/images'
        if (existsSync(imagePath.value) && readdirSync(imagePath.value).length > 0) {
          // Load images filenames.
          imageFiles.value = readdirSync(imagePath.value)
        }
        else {
          // Check if there are images for the selected game platform.
          imagePath.value = gamePath + '/images'
          if (existsSync(imagePath.value) && readdirSync(imagePath.value).length > 0) {
            // Load images filenames.
            imageFiles.value = readdirSync(imagePath.value)
          }
          else {
            // Empty image variables.
            imagePath.value = null
            imageFiles.value = []
          }
        }
      }
      // Store newly selected cover image.
      let coverNew = getCover.value ? getCover.value : getPictures.value[0]
      // Disable the image resizing.
      if (coverOld != coverNew) {
        //renderReady.value = false
      }
    }

    // Manage image load and resizing.
    let coverHover = ref(false)
    let imageHeight = ref('')
    let renderReady = ref(false)
    const resizeImage = () => {
      if (props.coverHeight()) {
        // Calculate space available and assign the image height.
        imageHeight.value = props.coverHeight() + 'px'
        // Enable image display.
        renderReady.value = true
      }
    }
    // Attach window resize event listener on creation.
    window.addEventListener('resize', resizeImage)
    onUnmounted(() => {
      // Remove window resize event listener on unmount.
      window.removeEventListener('resize', resizeImage)
    })

    // General image display management.
    let imageZoom = ref(false)
    const imageZoomToggle = () => {
      // Toggle zoom mode.
      imageZoom.value = !imageZoom.value
    }

    // Cover image display management.
    let imagesCoverDialog = ref(false)
    const imagesCoverOpen = () => {
      // Reset zoom mode.
      imageZoom.value = false
      // Open cover view.
      imagesCoverDialog.value = !imagesCoverDialog.value
    }
    const imagesCoverClose = () => {
      // Close cover view.
      imagesCoverDialog.value = !imagesCoverDialog.value
    }

    return {
      coverHover,
      getCover,
      getPictures,
      imageHeight,
      imagePath,
      imageZoom,
      imageZoomToggle,
      imagesCoverClose,
      imagesCoverDialog,
      imagesCoverOpen,
      renderReady,
      resizeImage,
    }
  }
}
</script>

<style scoped>
/* Calculations. */
.h-cover {
  height: calc(100vh - 4rem);
}
</style>