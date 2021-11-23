<template>
  <button
    class="hover:bg-color-300 dark:hover:bg-color-700 p-4 text-lg text-theme-800 dark:text-theme-100 w-full"
    :class="[
      buttonFirst ? 'rounded-tl-xl' : '',
      buttonLast ? 'rounded-bl-xl' : '',
      buttonSelected ? 'bg-color-300 dark:bg-color-700' : ''
    ]"
  >
    <div class="flex items-center justify-between">
      {{ buttonLabel }}
      <vi-icon
        v-if="buttonIcon"
        icon-manual
        class="text-color-600 dark:text-color-400 w-6"
      >
        <component :is="buttonIcon" />
      </vi-icon>
    </div>
  </button>
</template>

<script>
export default {
  name: 'ViButtonSettings',
  props: {
    buttonFirst: { type: Boolean, default: false },
    buttonIcon: { type: String, default: '' },
    buttonLast: { type: Boolean, default: false },
    buttonLabel: { type: String, default: '' },
    buttonSelected: { type: Boolean, default: false }
  }
}
</script>

<style scoped>
/* Styling. */
div {
  filter: drop-shadow(1px 1px 0px rgba(var(--color-theme-900), 0.6));
}
/* Transitions. */
button {
  transition: background-color 0.2s;
}
</style>