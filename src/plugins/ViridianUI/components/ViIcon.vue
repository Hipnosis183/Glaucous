<template>
  <!-- SVG structure. -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    :width="iconSize"
    :class="[
      { 'm-auto' : iconManual == false },
      { 'icon-shadow' : iconShadow }
    ]"
  >
    <!-- Icon contents. -->
    <slot />
  </svg>
</template>

<script>
export default {
  name: 'ViIcon',
  props: {
    iconManual: { type: Boolean, default: false },
    iconShadow: { type: Boolean, default: false },
    iconSize: { type: String, default: '100%' }
  }
}
</script>

<style scoped>
/* Styling. */
.icon-shadow {
  filter: drop-shadow(2px 2px 0px rgba(var(--color-theme-900), 0.6));
}
</style>