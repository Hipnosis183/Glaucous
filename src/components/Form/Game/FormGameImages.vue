<template>
  <!-- Show game platform images dialog. -->
  <form-game-images-view
    v-show="imagesPlatformDisplay"
    :show="imagesPlatformDisplay"
    :editForm="editForm"
    gameType="gamePlatform"
    @close="imagesPlatformShow()"
  />
  <!-- Show game region images dialog. -->
  <form-game-images-view
    v-show="imagesRegionDisplay"
    :show="imagesRegionDisplay"
    :editForm="editForm"
    gameType="gameRegion"
    @close="imagesRegionShow()"
  />
  <!-- Show game version images dialog. -->
  <form-game-images-view
    v-show="imagesVersionDisplay"
    :show="imagesVersionDisplay"
    :editForm="editForm"
    gameType="gameVersion"
    @close="imagesVersionShow()"
  />
  <!-- Images form. -->
  <vi-input-group
    label="Images"
    class="w-full"
  >
    <vi-input-button
      firstElement
      v-if="showPlatform"
      @click="imagesPlatformShow()"
      class="w-1/3"
    >
      Platform
    </vi-input-button>
    <vi-input-button
      v-if="showRegion"
      :firstElement="!showPlatform"
      @click="imagesRegionShow()"
      :class="!showPlatform ? 'w-1/2' : 'w-1/3'"
    >
      Region
    </vi-input-button>
    <vi-input-button
      v-if="showVersion"
      :firstElement="!showPlatform && !showRegion"
      lastElement
      @click="imagesVersionShow()"
      :class="!showPlatform ? !showRegion ? 'w-full' : 'w-1/2' : 'w-1/3'"
    >
      Version
    </vi-input-button>
  </vi-input-group>
</template>

<script>
// Import Vue functions.
import { ref } from 'vue'
// Import form components.
import FormGameImagesView from './FormGameImagesView.vue'

export default {
  name: 'FormGameImages',
  components: {
    FormGameImagesView
  },
  props: {
    editForm: { type: Boolean, default: false },
    showPlatform: { type: Boolean, default: false },
    showRegion: { type: Boolean, default: false },
    showVersion: { type: Boolean, default: false }
  },
  setup() {
    // Manage image form.
    const imagesPlatformDisplay = ref(false)
    const imagesPlatformShow = () => {
      // Toggle game platform images dialog.
      imagesPlatformDisplay.value = !imagesPlatformDisplay.value
    }
    const imagesRegionDisplay = ref(false)
    const imagesRegionShow = () => {
      // Toggle game region images dialog.
      imagesRegionDisplay.value = !imagesRegionDisplay.value
    }
    const imagesVersionDisplay = ref(false)
    const imagesVersionShow = () => {
      // Toggle game version images dialog.
      imagesVersionDisplay.value = !imagesVersionDisplay.value
    }

    return {
      imagesPlatformDisplay,
      imagesPlatformShow,
      imagesRegionDisplay,
      imagesRegionShow,
      imagesVersionDisplay,
      imagesVersionShow
    }
  }
}
</script>

<style>
</style>