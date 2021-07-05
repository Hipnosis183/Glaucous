<template>
  <hip-overlay>
    <hip-modal>
      <slot></slot>
    </hip-modal>
  </hip-overlay>
</template>

<script>
import HipModal from './HipModal.vue'
import HipOverlay from './HipOverlay.vue'

export default {
  name: 'HipDialog',
  components: {
    HipModal,
    HipOverlay
  }
}
</script>