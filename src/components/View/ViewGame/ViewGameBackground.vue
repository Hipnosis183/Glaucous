<template>
  <!-- Background image. -->
  <transition>
    <img
      v-if="backgroundImage"
      :key="backgroundImage"
      :src="'file://' + imagePath + '/' + backgroundImage"
      class="absolute h-full left-0 object-cover top-0 w-full"
      :class="{ 'rendering-pixelated' : backgroundRender && backgroundFiltering }"
      :style="'object-position:' + backgroundPlacement"
    />
  </transition>
  <!-- Background gradient layer. -->
  <div class="relative w-full">
    <div class="card-gradient flex flex-col h-full mt-auto shadow-color w-full">
      <!-- Game page contents. -->
      <slot />
    </div>
  </div>
</template>

<script>
// Import Vue functions.
import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
// Import functions from modules.
import { app } from '@electron/remote'
import { ensureDirSync } from 'fs-extra'
// Import utility functions.
import { readfiles } from '@/utils/filesystem'

export default {
  name: 'ViewGameBackground',
  props: {
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
    const getBackground = () => {
      return getImage((images) => {
        return images.filter((res) => res.startsWith('1'.repeat(8)))[0]
      })
    }
    const getCover = () => {
      return getImage((images) => {
        return images.filter((res) => res.startsWith('0'.repeat(8)))[0]
      })
    }
    const getPictures = () => {
      return getImage((images) => {
        return images.filter((res) => !res.startsWith('0'.repeat(8)) && !res.startsWith('1'.repeat(8)))
      }, true)
    }
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

    // Manage image display.
    let backgroundRender = ref(false)
    const backgroundImage = computed(() => {
      let settingsGame = store.getters.getSettingsGameOverSettingsOver
        ? store.getters.getSettingsGameOverBackgroundImage
        : store.getters.getSettingsGameBackgroundImage
      switch (settingsGame) {
        case 0: {
          // Default to the normal image fallback mode.
          let backgroundImage = getBackground()
          if (backgroundImage) {
            backgroundRender.value = false
            return backgroundImage
          }
          let coverImage = getCover()
          if (coverImage) {
            backgroundRender.value = false
            return coverImage
          }
          let pictureImage = getPictures()
          if (pictureImage.length > 0) {
            backgroundRender.value = true
            return pictureImage[0]
          }
          break
        }
        case 1: {
          backgroundRender.value = false
          return getBackground()
        }
        case 2: {
          backgroundRender.value = false
          return getCover()
        }
        case 3: {
          backgroundRender.value = true
          return getPictures()[0]
        }
        case 4: {
          backgroundRender.value = true
          // Asume that after the first picture are all in-game images.
          let image = getPictures().filter((res, index) => index > 0)
          // Select random in-game image to display.
          return image[Math.floor(Math.random() * (image.length))]
        }
      }
    })
    const backgroundPlacement = computed(() => {
      let settingsGame = store.getters.getSettingsGameOverSettingsOver
        ? store.getters.getSettingsGameOverBackgroundPlacement
        : store.getters.getSettingsGameBackgroundPlacement
      switch (settingsGame) {
        case 0: { return 'center' }
        case 1: { return 'top' }
        case 2: { return 'bottom' }
        case 3: { return 'left' }
        case 4: { return 'right' }
      }
    })
    const backgroundFiltering = computed(() => {
      return store.getters.getSettingsPlatformOverSettingsOver
        ? !store.getters.getSettingsPlatformOverImagesFiltering
        : !store.getters.getSettingsPlatformImagesFiltering
    })

    return {
      backgroundFiltering,
      backgroundImage,
      backgroundPlacement,
      backgroundRender,
      imagePath
    }
  }
}
</script>

<style scoped>
/* Styling. */
.card-gradient {
  background-image: linear-gradient(
    rgba(var(--color-theme-200), 0),
    rgba(var(--color-theme-200), 0.1) 5%,
    rgba(var(--color-theme-200), 0.3) 15%,
    rgba(var(--color-theme-200), 0.5) 25%,
    rgba(var(--color-theme-200), 0.7) 35%,
    rgba(var(--color-theme-200), 0.8) 45%,
    rgba(var(--color-theme-200), 0.9) 65%,
    rgba(var(--color-theme-200), 1)
  );
}
.dark .card-gradient {
  background-image: linear-gradient(
    rgba(var(--color-theme-900), 0),
    rgba(var(--color-theme-900), 0.1) 5%,
    rgba(var(--color-theme-900), 0.3) 15%,
    rgba(var(--color-theme-900), 0.5) 25%,
    rgba(var(--color-theme-900), 0.7) 35%,
    rgba(var(--color-theme-900), 0.8) 45%,
    rgba(var(--color-theme-900), 0.9) 65%,
    rgba(var(--color-theme-900), 1)
  );
}
.rendering-pixelated {
  image-rendering: pixelated;
}
</style>