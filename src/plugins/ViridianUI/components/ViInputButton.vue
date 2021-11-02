<template>
  <button
    class="bg-theme-200 dark:bg-theme-900 hover:bg-color-300 dark:hover:bg-color-900 px-3 text-theme-800 dark:text-theme-200"
    :class="[
      bottomElement || topElement ? 'h-1/2' : 'h-full py-2',
      { 'text-shadow' : $store.getters.getSettingsThemesDarkMode },
      { 'pb-0.5 rounded-br-xl' : bottomElement },
      { 'pt-0.5 rounded-tr-xl' : topElement },
      { 'rounded-l-xl' : firstElement },
      { 'rounded-r-xl' : lastElement }
    ]"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'ViInputButton',
  props: {
    bottomElement: { type: Boolean, default: false },
    firstElement: { type: Boolean, default: false },
    lastElement: { type: Boolean, default: false },
    topElement: { type: Boolean, default: false }
  }
}
</script>

<style scoped>
/* Transitions. */
button {
  transition: background-color 0.5s, opacity 0.5s ease;
}
</style>