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
    class="flex-shrink-0 ml-auto p-8 pb-0 relative"
    :style="'height:' + imageHeight"
  >
    <!-- Cover overlay. -->
    <div
      @mouseenter="coverHover = true"
      @mouseleave="coverHover = false"
      @click="imagesCoverOpen()"
      class="absolute border-2 border-transparent hover:border-color-400 dark:hover:border-color-900 bottom-0 cursor-pointer duration-200 left-0 m-8 mb-0 right-0 rounded-list hover:scale-102 shadow-color top-0 transform z-5"
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
import { useStore } from 'vuex'
// Import functions from modules.
import { app } from '@electron/remote'
import { ensureDirSync } from 'fs-extra'
// Import utility functions.
import { debounce } from '@/utils/debounce'
import { readfiles } from '@/utils/filesystem'

export default {
  name: 'ViewGameCover',
  props: {
    coverHeight: { type: Function },
    gameInfo: { type: Object },
    regionIndex: { type: Number },
    versionIndex: { type: Number }
  },
  setup(props) {
    // Instantiate Vue elements.
    const store = useStore()

    // Load game images.
    onMounted(() => { getImages() })
    const getImages = () => {
      if (props.gameInfo._id) {
        // Set the image directory path for all game types.
        let gamePathPlatform = app.getAppPath() + '/data/images/' + props.gameInfo.platform._id + '/' + props.gameInfo._id
        let gamePathRegion = '/' + props.gameInfo.gameRegions[props.regionIndex]._id
        let gamePathVersion = '/' + props.gameInfo.gameRegions[props.regionIndex].gameVersions[props.versionIndex]._id
        imagePathPlatform.value = gamePathPlatform
        imagePathRegion.value = gamePathPlatform + gamePathRegion
        imagePathVersion.value = gamePathPlatform + gamePathRegion + gamePathVersion
        // Ensure images directories existance.
        ensureDirSync(imagePathPlatform.value)
        ensureDirSync(imagePathRegion.value)
        ensureDirSync(imagePathVersion.value)
        // Load images filenames.
        imageFilesPlatform.value = readfiles(imagePathPlatform.value)
        imageFilesRegion.value = readfiles(imagePathRegion.value)
        imageFilesVersion.value = readfiles(imagePathVersion.value)
      }
    }

    // Watch for game selection changes.
    watch(() => [props.regionIndex, props.versionIndex], () => { getImages() })

    // Image reading operations.
    let imagePath = ref(null)
    let imagePathPlatform = ref(null)
    let imagePathRegion = ref(null)
    let imagePathVersion = ref(null)
    let imageFilesPlatform = ref([])
    let imageFilesRegion = ref([])
    let imageFilesVersion = ref([])
    const getCover = computed(() => {
      let settingsGame = store.getters.getSettingsGameOverSettingsOver
        ? store.getters.getSettingsGameOverDisplayCoverImage
        : store.getters.getSettingsGameDisplayCoverImage
      return !settingsGame ? false : getImage((images) => {
        return images.filter((res) => res.startsWith('0'.repeat(8)))[0]
      })
    })
    const getImage = (method, array) => {
      // Get array of images for the game version.
      if (imageFilesVersion.value.length > 0) {
        let imagesVersion = method(imageFilesVersion.value)
        if (array ? imagesVersion.length > 0 : imagesVersion) {
          imagePath.value = imagePathVersion.value
          return imagesVersion
        }
      }
      // Get array of images for the game region.
      if (imageFilesRegion.value.length > 0) {
        let imagesRegion = method(imageFilesRegion.value)
        if (array ? imagesRegion.length > 0 : imagesRegion) {
          imagePath.value = imagePathRegion.value
          return imagesRegion
        }
      }
      // Get array of images for the game platform.
      if (imageFilesPlatform.value.length > 0) {
        let imagesPlatform = method(imageFilesPlatform.value)
        if (array ? imagesPlatform.length > 0 : imagesPlatform) {
          imagePath.value = imagePathPlatform.value
          return imagesPlatform
        }
      }
      return array ? [] : null
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
    const resizeImageDebounced = debounce(() => resizeImage(), 500)
    // Attach window resize event listener on creation.
    window.addEventListener('resize', resizeImageDebounced)
    onUnmounted(() => {
      // Remove window resize event listener on unmount.
      window.removeEventListener('resize', resizeImageDebounced)
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