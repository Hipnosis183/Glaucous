<template>
  <button
    class="bg-color-700 dark:bg-color-800 hover:bg-color-600 dark:hover:bg-color-700 px-4 py-2 rounded-list text-theme-200 whitespace-nowrap"
    :class="[
      buttonLarge ? 'w-full' : 'w-max',
      { 'h-12 text-xl' : buttonSize == 'small' },
      { 'h-16 text-2xl' : buttonSize == 'medium' },
      { 'h-20 text-4xl' : buttonSize == 'large' }
    ]"
  >
    <h6 class="flex w-full">
      <slot></slot>
    </h6>
  </button>
</template>

<script>
export default {
  name: 'ViButtonUI',
  props: {
    buttonLarge: { type: Boolean, default: false },
    buttonSize: { type: String, default: 'small' }
  }
}
</script>

<style scoped>
button {
  transition: background-color 0.5s, opacity 0.5s ease;
}
h6 {
  filter: drop-shadow(2px 2px 0px rgba(var(--color-theme-900), 0.6));
}
</style>