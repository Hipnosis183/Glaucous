<template>
  <button
    class="bg-theme-100 dark:bg-theme-800 font-semibold h-full rounded-full shadow text-base text-color-800 dark:text-color-500"
    :class="[
      $store.getters.getSettingsThemesDarkMode ? 'text-shadow' : '',
      large ? 'w-full' : 'w-max',
      icon ? 'px-2 py-2' : 'px-4 py-2'
    ]"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'HipButton',
  props: {
    icon: { type: Boolean, default: false },
    large: { type: Boolean, default: false }
  }
}
</script>

<style>
</style>