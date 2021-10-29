<template>
  <vi-overlay :width="width ? width : false">
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
    width: { type: String }
  }
}
</script>

<style>
</style>