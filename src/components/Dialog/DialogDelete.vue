<template>
  <!-- Delete dialog. -->
  <vi-dialog
    @close="$emit('cancel')"
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
      <vi-button-icon @click="$emit('cancel')">
        <vi-icon class="w-6">
          <icon-close />
        </vi-icon>
      </vi-button-icon>
    </div>
  </vi-dialog>
</template>

<script>
export default {
  name: 'DialogDelete',
  emits: [
    'accept',
    'cancel'
  ]
}
</script>

<style>
</style>