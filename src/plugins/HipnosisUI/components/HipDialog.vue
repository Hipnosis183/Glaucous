<template>
  <hip-overlay :width="width ? width : false">
    <hip-modal>
      <slot></slot>
    </hip-modal>
  </hip-overlay>
</template>

<script>
// Import UI components.
import HipModal from './HipModal.vue'
import HipOverlay from './HipOverlay.vue'

export default {
  name: 'HipDialog',
  components: {
    HipModal,
    HipOverlay
  },
  props: {
    width: { type: String }
  }
}
</script>

<style>
</style>