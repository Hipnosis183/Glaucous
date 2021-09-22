<template>
  <!-- SVG structure. -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    :width="size"
    class="m-auto"
    :class="$store.getters.getSettingsThemesDarkMode && !noshadow ? 'icon-shadow' : ''"
  >
    <!-- Icon contents. -->
    <slot></slot>
  </svg>
</template>

<script>
export default {
  name: 'HipIcon',
  props: {
    noshadow: { type: Boolean, default: false },
    size: { type: String, default: '100%' }
  }
}
</script>

<style scoped>
/* Styling. */
.icon-shadow {
  filter: drop-shadow(1px 1px 0px var(--color-theme-900));
}
</style>