<template>
  <button
    class="hover:bg-color-300 dark:hover:bg-color-700 flex items-center justify-between p-4 text-lg text-theme-800 dark:text-theme-100 w-full"
    :class="[
      buttonFirst ? 'rounded-t-xl' : '',
      buttonLast ? 'rounded-b-xl' : '',
      buttonSelected ? 'bg-color-300 dark:bg-color-700' : ''
    ]"
  >
    {{ buttonLabel }}
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
    buttonFirst: { type: Boolean, default: false },
    buttonLast: { type: Boolean, default: false },
    buttonLabel: { type: String, default: '' },
    buttonSelected: { type: Boolean, default: false }
  }
}
</script>

<style scoped>
/* Transitions. */
button {
  transition: background-color 0.2s;
}
</style>