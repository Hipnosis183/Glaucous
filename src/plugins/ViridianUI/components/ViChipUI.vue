<template>
  <div
    @click.self="$emit('clicked')"
    class="bg-color-700 dark:bg-color-800 hover:bg-color-600 dark:hover:bg-color-700 cursor-pointer flex h-full px-4 py-2 shadow-color text-theme-200"
  >
    <h6 class="pointer-events-none">
      <slot />
    </h6>
  </div>
</template>

<script>
export default {
  name: 'ViChipUI'
}
</script>

<style scoped>
/* Styling. */
h6 {
  filter: drop-shadow(2px 2px 0px rgba(var(--color-theme-900), 0.8));
}
/* Transitions. */
div {
  transition: background-color 0.5s, opacity 0.5s ease;
}
</style>