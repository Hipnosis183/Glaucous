<template>
  <!-- Dialog overlay. -->
  <vi-overlay
    :overlay-color="dialogOverlay"
    :overlay-height="dialogHeight ? dialogHeight : false"
    :overlay-width="dialogWidth ? dialogWidth : false"
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
    dialogHeight: { type: String },
    dialogWidth: { type: String },
    dialogOverlay: { type: Boolean, default: true }
  }
}
</script>

<style>
</style>