<template>
  <button class="hover:bg-color-500 dark:hover:bg-color-600 font-medium h-14 items-center space-x-4 text-color-200 text-xl w-full">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'ViButtonSb'
}
</script>

<style scoped>
/* Transitions. */
button {
  transition: background-color 0.5s;
}
</style>