<template>
  <div
    @click.self="chipClick ? $emit('clicked') : ''"
    class="flex h-full py-2 shadow-color text-base text-color-800 dark:text-color-500"
    :class="[
      chipClick ? 'cursor-pointer' : 'cursor-default',
      chipDark ? 'bg-theme-100 dark:bg-theme-900 hover:bg-theme-200 dark:hover:bg-theme-700' : 'bg-theme-100 dark:bg-theme-800 hover:bg-theme-200 dark:hover:bg-theme-900',
      chipRounded ? 'rounded-full' : 'rounded-2xl',
      { 'w-full' : chipLarge }
    ]"
  >
    <div class="mx-4 overflow-hidden pointer-events-none whitespace-nowrap">
      <slot />
    </div>
    <button
      v-if="chipRemove"
      class="h-6 my-auto mx-2 p-1 rounded-full w-6"
      :class="[
        chipDark ? 'bg-theme-200 dark:bg-theme-900 hover:bg-theme-0 dark:hover:bg-theme-800' : 'bg-theme-200 dark:bg-theme-900 hover:bg-theme-0 dark:hover:bg-theme-700',
        chipLarge ? 'ml-auto flex-shrink-0' : ''
      ]"
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
    chipClick: { type: Boolean, default: false },
    chipDark: { type: Boolean, default: false },
    chipLarge: { type: Boolean, default: false },
    chipRemove: { type: Boolean, default: true },
    chipRounded: { type: Boolean, default: false }
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