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
  <div class="flex rounded-xl shadow-color">
    <vi-input-button
      firstElement
      class="cursor-default"
    >
      <vi-icon class="w-6">
        <icon-picture />
      </vi-icon>
    </vi-input-button>
    <vi-input-button
      v-if="showPlatform"
      @click="imagesPlatformShow()"
    >Platform</vi-input-button>
    <vi-input-button
      v-if="showRegion"
      @click="imagesRegionShow()"
    >Region</vi-input-button>
    <vi-input-button
      v-if="showVersion"
      lastElement
      @click="imagesVersionShow()"
    >Version</vi-input-button>
  </div>
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