<template>
  <!-- SVG structure. -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    :width="size"
    :class="[
      { 'm-auto' : manual == false },
      { 'icon-shadow' : $store.getters.getSettingsThemesDarkMode && !noshadow }
    ]"
  >
    <!-- Icon contents. -->
    <slot></slot>
  </svg>
</template>

<script>
export default {
  name: 'HipIcon',
  props: {
    manual: { type: Boolean, default: false },
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