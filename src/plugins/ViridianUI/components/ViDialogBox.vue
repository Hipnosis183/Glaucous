<template>
  <!-- Delete dialog. -->
  <vi-dialog
    :dialog-overlay="dialogOverlay"
    @close="$emit(dialogActions == 'Ok' ? 'accept' : 'cancel')"
    class="pos-initial z-10"
  >
    <!-- Dialog message. -->
    <p class="text-center text-lg">
      <slot />
    </p>
    <!-- Dialog buttons. -->
    <div class="flex justify-center mt-6 space-x-4">
      <!-- Confirm deletion. -->
      <vi-button
        button-icon="icon-check"
        @click="$emit('accept')"
      />
      <!-- Cancel deletion. -->
      <vi-button
        v-if="dialogActions == 'OkCancel'"
        button-icon="icon-close"
        @click="$emit('cancel')"
      />
    </div>
  </vi-dialog>
</template>

<script>
// Import UI components.
import ViDialog from './ViDialog.vue'
import ViIcon from './ViIcon.vue'

export default {
  name: 'ViDialogBox',
  components: {
    ViDialog,
    ViIcon
  },
  emits: [
    'accept',
    'cancel'
  ],
  props: {
    dialogActions: { type: String, default: 'Ok' },
    dialogOverlay: { type: Boolean, default: true }
  }
}
</script>

<style>
</style>