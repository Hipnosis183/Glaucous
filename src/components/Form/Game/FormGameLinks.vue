<template>
  <!-- Show game platform links dialog. -->
  <form-game-links-view
    v-show="linksPlatformDisplay"
    game-type="GamePlatform"
    @close="linksPlatformShow()"
  />
  <!-- Show game region links dialog. -->
  <form-game-links-view
    v-show="linksRegionDisplay"
    game-type="GameRegion"
    @close="linksRegionShow()"
  />
  <!-- Show game version links dialog. -->
  <form-game-links-view
    v-show="linksVersionDisplay"
    game-type="GameVersion"
    @close="linksVersionShow()"
  />
  <!-- Links form. -->
  <vi-input-group
    label="Links"
    class="w-full"
  >
    <vi-input-button
      first-element
      v-if="showPlatform"
      @click="linksPlatformShow()"
      class="w-1/3"
    >
      Platform
    </vi-input-button>
    <vi-input-button
      v-if="showRegion"
      :first-element="!showPlatform"
      @click="linksRegionShow()"
      :class="!showPlatform ? 'w-1/2' : 'w-1/3'"
    >
      Region
    </vi-input-button>
    <vi-input-button
      v-if="showVersion"
      :first-element="!showPlatform && !showRegion"
      last-element
      @click="linksVersionShow()"
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
import FormGameLinksView from './FormGameLinksView.vue'

export default {
  name: 'FormGameLinks',
  components: {
    FormGameLinksView
  },
  props: {
    showPlatform: { type: Boolean, default: false },
    showRegion: { type: Boolean, default: false },
    showVersion: { type: Boolean, default: false }
  },
  setup() {
    // Manage links form.
    let linksPlatformDisplay = ref(false)
    const linksPlatformShow = () => {
      // Toggle game platform links dialog.
      linksPlatformDisplay.value = !linksPlatformDisplay.value
    }
    let linksRegionDisplay = ref(false)
    const linksRegionShow = () => {
      // Toggle game region links dialog.
      linksRegionDisplay.value = !linksRegionDisplay.value
    }
    let linksVersionDisplay = ref(false)
    const linksVersionShow = () => {
      // Toggle game version links dialog.
      linksVersionDisplay.value = !linksVersionDisplay.value
    }

    return {
      linksPlatformDisplay,
      linksPlatformShow,
      linksRegionDisplay,
      linksRegionShow,
      linksVersionDisplay,
      linksVersionShow
    }
  }
}
</script>

<style>
</style>