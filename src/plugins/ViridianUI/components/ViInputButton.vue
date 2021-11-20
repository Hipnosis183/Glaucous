<template>
  <button
    class="bg-theme-200 dark:bg-theme-900 hover:bg-color-300 dark:hover:bg-color-900 px-3 text-theme-800 dark:text-theme-200"
    :class="[
      inputBottom || inputTop ? 'h-1/2' : 'h-full py-2',
      { 'pb-0.5 rounded-br-xl' : inputBottom },
      { 'pt-0.5 rounded-tr-xl' : inputTop },
      { 'rounded-l-xl' : inputFirst },
      { 'rounded-r-xl' : inputLast }
    ]"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'ViInputButton',
  props: {
    inputBottom: { type: Boolean, default: false },
    inputFirst: { type: Boolean, default: false },
    inputLast: { type: Boolean, default: false },
    inputTop: { type: Boolean, default: false }
  }
}
</script>

<style scoped>
/* Transitions. */
button {
  transition: background-color 0.5s, opacity 0.5s ease;
}
</style>