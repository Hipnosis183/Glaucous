<template>
  <!-- Delete dialog. -->
  <vi-dialog
    @close="$emit(actions == 'Ok' ? 'accept' : 'cancel')"
    class="pos-initial z-10"
  >
    <!-- Dialog message. -->
    <p class="text-center text-lg">
      <slot></slot>
    </p>
    <!-- Dialog buttons. -->
    <div class="flex justify-center mt-6 space-x-4">
      <!-- Confirm deletion. -->
      <vi-button-icon @click="$emit('accept')">
        <vi-icon class="w-6">
          <icon-check />
        </vi-icon>
      </vi-button-icon>
      <!-- Cancel deletion. -->
      <vi-button-icon
        v-if="actions == 'OkCancel'"
        @click="$emit('cancel')"
      >
        <vi-icon class="w-6">
          <icon-close />
        </vi-icon>
      </vi-button-icon>
    </div>
  </vi-dialog>
</template>

<script>
// Import UI components.
import ViButtonIcon from './ViButtonIcon.vue'
import ViDialog from './ViDialog.vue'
import ViIcon from './ViIcon.vue'

export default {
  name: 'ViDialogBox',
  components: {
    ViButtonIcon,
    ViDialog,
    ViIcon
  },
  emits: [
    'accept',
    'cancel'
  ],
  props: {
    actions: { type: String, default: 'Ok' }
  }
}
</script>

<style>
</style>