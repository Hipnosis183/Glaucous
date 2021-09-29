<template>
  <button
    class="bg-theme-100 dark:bg-theme-800 h-10 px-4 py-2 shadow-color text-base whitespace-nowrap"
    :class="[
      $store.getters.getSettingsThemesDarkMode ? 'text-shadow' : '',
      color ? 'font-semibold text-color-800 dark:text-color-500 rounded-full' : 'text-theme-800 dark:text-theme-200 rounded-xl',
      large ? 'w-full' : 'w-max'
    ]"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'ViButton',
  props: {
    color: { type: Boolean, default: false },
    large: { type: Boolean, default: false }
  }
}
</script>

<style>
</style>