<template>
  <div
    @click.self="clickable ? $emit('clicked') : ''"
    class="bg-theme-100 dark:bg-theme-800 hover:bg-theme-200 dark:hover:bg-theme-900 flex h-full px-4 py-2 shadow-color text-base text-color-800 dark:text-color-500"
    :class="[
      $store.getters.getSettingsThemesDarkMode ? 'text-shadow' : '',
      clickable ? 'cursor-pointer' : 'cursor-default',
      multiline ? 'rounded-2xl' : 'rounded-full',
      { 'w-full' : large }
    ]"
  >
    <div class="pointer-events-none">
      <slot />
    </div>
    <button
      v-if="removeable"
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
    clickable: { type: Boolean, default: false },
    large: { type: Boolean, default: false },
    multiline: { type: Boolean, default: false },
    removeable: { type: Boolean, default: true }
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