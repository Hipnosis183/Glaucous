<template>
  <div class="w-full">
    <!-- Label. -->
    <vi-label v-if="inputLabel">{{ inputLabel }}</vi-label>
    <!-- Container. -->
    <div class="flex h-10 rounded-xl shadow-color">
      <slot />
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
    inputLabel: { type: String }
  }
}
</script>

<style>
</style>