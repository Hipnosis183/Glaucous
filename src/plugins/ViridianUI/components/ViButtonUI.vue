<template>
  <button
    class="bg-color-700 dark:bg-color-800 hover:bg-color-600 dark:hover:bg-color-700 shadow-color text-theme-200 transform whitespace-nowrap"
    :class="[
      buttonLarge ? 'w-full' : 'w-max',
      buttonSmall ? 'p-1 hover:scale-105' : 'px-4 py-2',
      { 'h-12 text-xl hover:scale-105' : !buttonSmall && buttonSize == 'small' },
      { 'h-16 text-2xl hover:scale-102' : !buttonSmall && buttonSize == 'medium' },
      { 'h-20 text-4xl hover:scale-101' : !buttonSmall && buttonSize == 'large' }
    ]"
  >
    <vi-icon
      v-if="buttonSmall"
      class="w-6"
    >
      <component :is="buttonSmall" />
    </vi-icon>
    <h6
      v-else
      class="flex w-full"
    >
      <slot />
    </h6>
  </button>
</template>

<script>
export default {
  name: 'ViButtonUI',
  props: {
    buttonLarge: { type: Boolean, default: false },
    buttonSmall: { type: String, default: '' },
    buttonSize: { type: String, default: 'small' }
  }
}
</script>

<style scoped>
/* Styling. */
h6,
vi-icon {
  filter: drop-shadow(2px 2px 0px rgba(var(--color-theme-900), 0.6));
}
/* Transitions. */
button {
  transition: background-color 0.5s, opacity 0.5s, transform 0.2s;
}
</style>