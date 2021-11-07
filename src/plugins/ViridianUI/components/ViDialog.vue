<template>
  <!-- Dialog overlay. -->
  <vi-overlay
    :overlay="overlay"
    :height="height ? height : false"
    :width="width ? width : false"
  >
    <!-- Dialog modal. -->
    <vi-modal>
      <!-- Dialog contents. -->
      <slot />
    </vi-modal>
  </vi-overlay>
</template>

<script>
// Import UI components.
import ViModal from './ViModal.vue'
import ViOverlay from './ViOverlay.vue'

export default {
  name: 'ViDialog',
  components: {
    ViModal,
    ViOverlay
  },
  props: {
    overlay: { type: Boolean, default: true },
    height: { type: String },
    width: { type: String }
  }
}
</script>

<style>
</style>