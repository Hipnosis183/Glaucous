<template>
  <div
    @click.self="large ? $emit('clicked') : ''"
    class="bg-theme-100 dark:bg-theme-800 hover:bg-theme-200 dark:hover:bg-theme-900 flex h-full px-4 py-2 rounded-full shadow-color text-base text-color-800 dark:text-color-500"
    :class="[
      $store.getters.getSettingsThemesDarkMode ? 'text-shadow' : '',
      large ? 'cursor-pointer w-full' : 'cursor-default'
    ]"
  >
    <slot></slot>
    <button
      class="bg-theme-200 dark:bg-theme-900 hover:bg-theme-0 dark:hover:bg-theme-700 h-6 -mr-2 my-auto p-1 rounded-full w-6"
      :class="large ? 'ml-auto' : 'ml-2'"
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
  name: 'ViChip',
  props: {
    large: { type: Boolean, default: false }
  }
}
</script>

<style scoped>
/* Transitions. */
button,
div {
  transition: background-color 0.5s;
}
</style>