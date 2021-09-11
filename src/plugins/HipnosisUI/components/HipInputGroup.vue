<template>
  <div class="w-full">
    <!-- Label. -->
    <hip-label v-if="label">{{ label }}</hip-label>
    <!-- Container. -->
    <div class="flex h-10 rounded-xl shadow">
      <slot></slot>
    </div>
  </div>
</template>

<script>
// Import UI components.
import HipLabel from './HipLabel.vue'

export default {
  name: 'HipInputGroup',
  components: {
    HipLabel
  },
  props: {
    label: { type: String }
  }
}
</script>

<style>
</style>