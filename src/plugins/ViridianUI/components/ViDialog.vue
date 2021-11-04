<template>
  <vi-overlay
    :height="height ? height : false"
    :width="width ? width : false"
  >
    <vi-modal>
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
    height: { type: String },
    width: { type: String }
  }
}
</script>

<style>
</style>