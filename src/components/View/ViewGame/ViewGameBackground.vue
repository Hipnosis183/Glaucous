<template>
  <!-- Background image. -->
  <transition>
    <img
      v-if="getCover || getPictures[0]"
      :key="getCover || getPictures[0]"
      :src="'file://' + imagePath + '/' + (getCover ? getCover : getPictures[0])"
      class="absolute h-full left-0 object-center object-cover rounded-b-4xl rounded-t-list top-0 w-full"
      :class="{ 'rendering-pixelated' : gameInfo.config.imageFiltering == false && !getCover }"
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
import { existsSync, readdirSync } from 'fs-extra'

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
    let imageFiles = ref([])
    let imagePath = ref(null)
    const getCover = computed(() => {
      // Get cover image.
      return imageFiles.value.filter(res => res.startsWith('0'.repeat(8)))[0]
    })
    const getPictures = computed(() => {
      // Get array of pictures.
      return imageFiles.value.filter(res => !res.startsWith('0'.repeat(8)))
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

    return {
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