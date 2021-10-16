<template>
  <button class="hover:bg-color-500 dark:hover:bg-color-600 font-medium h-14 text-color-200 text-xl w-full">
    <h6 class="flex h-full items-center space-x-4 w-full">
      <slot></slot>
    </h6>
  </button>
</template>

<script>
export default {
  name: 'ViButtonSb'
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