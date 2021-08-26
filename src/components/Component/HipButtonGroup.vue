<template>
  <button
    class="bg-theme-100 dark:bg-theme-800 font-semibold h-full px-4 py-2 text-2xl text-color-800 dark:text-color-500"
    :class="[
      $store.getters.getSettingsThemesDarkMode ? 'text-shadow' : '',
      firstElement ? 'rounded-l-full' : '',
      lastElement ? 'rounded-r-full' : ''
    ]"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'HipButtonGroup',
  props: {
    firstElement: { type: Boolean, default: false },
    lastElement: { type: Boolean, default: false }
  }
}
</script>