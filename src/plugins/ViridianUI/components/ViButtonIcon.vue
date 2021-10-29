<template>
  <button
    class="bg-theme-100 dark:bg-theme-800 font-semibold h-full px-2 py-2 rounded-full shadow-color text-base text-color-800 dark:text-color-500"
    :class="{ 'text-shadow' : $store.getters.getSettingsThemesDarkMode }"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'ViButtonIcon'
}
</script>

<style>
</style>