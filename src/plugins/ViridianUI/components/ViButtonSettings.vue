<template>
  <button
    class="hover:bg-color-300 dark:hover:bg-color-700 flex items-center justify-between p-4 text-lg text-theme-800 dark:text-theme-100 w-full"
    :class="[
      firstElement ? 'rounded-t-xl' : '',
      lastElement ? 'rounded-b-xl' : '',
      selected ? 'bg-color-300 dark:bg-color-700' : ''
    ]"
  >
    {{ label }}
    <vi-icon
      icon-manual
      class="text-color-600 dark:text-color-400 w-5"
    >
      <icon-caret-right />
    </vi-icon>
  </button>
</template>

<script>
export default {
  name: 'ViButtonSettings',
  props: {
    firstElement: { type: Boolean, default: false },
    lastElement: { type: Boolean, default: false },
    label: { type: String, default: '' },
    selected: { type: Boolean, default: false }
  }
}
</script>

<style scoped>
/* Transitions. */
button {
  transition: background-color 0.2s;
}
</style>