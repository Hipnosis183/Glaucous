<template>
  <button
    class="bg-theme-200 dark:bg-theme-800 cursor-pointer font-semibold p-2 rounded-xl shadow-color text-base text-theme-600 dark:text-theme-200 w-max"
    :class="$store.getters.getSettingsThemesDarkMode ? 'text-shadow' : ''"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'ViButtonSmall'
}
</script>

<style>
</style>