<template>
  <div
    class="bg-theme-100 dark:bg-theme-800 cursor-default flex h-full px-4 py-2 rounded-full shadow-color text-base text-color-800 dark:text-color-500"
    :class="$store.getters.getSettingsThemesDarkMode ? 'text-shadow' : ''"
  >
    <slot></slot>
    <button
      class="bg-theme-200 dark:bg-theme-900 h-6 ml-2 -mr-2 my-auto p-1 rounded-full w-6"
      @click="$emit('remove')"
    >
      <vi-icon>
        <icon-cross />
      </vi-icon>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ViChip'
}
</script>

<style>
</style>