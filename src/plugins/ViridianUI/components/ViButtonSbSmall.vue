<template>
  <button class="bg-color-600 dark:bg-color-700 hover:bg-color-400 dark:hover:bg-color-500 py-3 text-color-100 w-full">
    <h6 class="flex h-full items-center w-full">
      <slot />
    </h6>
  </button>
</template>

<script>
export default {
  name: 'ViButtonSbSmall'
}
</script>

<style scoped>
/* Styling. */
h6 {
  filter: drop-shadow(1px 1px 0px rgba(var(--color-theme-900), 0.6));
}
/* Transitions. */
button {
  transition: background-color 0.5s;
}
</style>