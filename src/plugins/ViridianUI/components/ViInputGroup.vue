<template>
  <div class="w-full">
    <!-- Label. -->
    <vi-label v-if="label">{{ label }}</vi-label>
    <!-- Container. -->
    <div class="flex h-10 rounded-xl shadow-color">
      <slot></slot>
    </div>
  </div>
</template>

<script>
// Import UI components.
import ViLabel from './ViLabel.vue'

export default {
  name: 'ViInputGroup',
  components: {
    ViLabel
  },
  props: {
    label: { type: String }
  }
}
</script>

<style>
</style>