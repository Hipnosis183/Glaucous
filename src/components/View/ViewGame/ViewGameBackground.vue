<template>
  <!-- Background image. -->
  <transition>
    <img
      v-if="getBackground"
      :key="getBackground"
      :src="'file://' + imagePath + '/' + getBackground"
      class="absolute h-full left-0 object-center object-cover rounded-b-4xl rounded-t-list top-0 w-full"
    />
  </transition>
  <!-- Background gradient layer. -->
  <div class="relative w-full">
    <div
      class="flex flex-col mt-auto rounded-b-list shadow-color w-full"
      :class="{ 'card-gradient h-full' : true }"
    >
      <!-- Game page contents. -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
// Import Vue functions.
import { computed, onMounted, ref, watch } from 'vue'
// Import functions from modules.
import { app } from '@electron/remote'
import { ensureDirSync, readdirSync } from 'fs-extra'

export default {
  name: 'ViewGameBackground',
  props: {
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
    let imagePath = ref(null)
    let imagePathPlatform = ref(null)
    let imagePathRegion = ref(null)
    let imagePathVersion = ref(null)
    let imageFilesPlatform = ref([])
    let imageFilesRegion = ref([])
    let imageFilesVersion = ref([])
    const getBackground = computed(() => {
      return getImage((images) => {
        return images.filter((res) => res.startsWith('1'.repeat(8)))[0]
      })
    })
    const getCover = computed(() => {
      return getImage((images) => {
        return images.filter((res) => res.startsWith('0'.repeat(8)))[0]
      })
    })
    const getPictures = computed(() => {
      return getImage((images) => {
        return images.filter((res) => !res.startsWith('0'.repeat(8)) && !res.startsWith('1'.repeat(8)))
      }, true)
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
    const getImages = () => {
      // Set the image directory path for all game types.
      let gamePathPlatform = app.getAppPath() + '/data/' + props.gameInfo.platform._id + '/' + props.gameInfo._id
      let gamePathRegion = '/games/' + props.gameInfo.gameRegions[props.regionIndex]._id
      let gamePathVersion = '/games/' + props.gameInfo.gameRegions[props.regionIndex].gameVersions[props.versionIndex]._id
      imagePathPlatform.value = gamePathPlatform + '/images'
      imagePathRegion.value = gamePathPlatform + gamePathRegion + '/images'
      imagePathVersion.value = gamePathPlatform + gamePathRegion + gamePathVersion + '/images'
      // Ensure images directories existance.
      ensureDirSync(imagePathPlatform.value)
      ensureDirSync(imagePathRegion.value)
      ensureDirSync(imagePathVersion.value)
      // Load images filenames.
      imageFilesPlatform.value = readdirSync(imagePathPlatform.value)
      imageFilesRegion.value = readdirSync(imagePathRegion.value)
      imageFilesVersion.value = readdirSync(imagePathVersion.value)
    }

    return {
      getBackground,
      getCover,
      getPictures,
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