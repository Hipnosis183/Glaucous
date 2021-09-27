<template>
  <button class="bg-color-600 dark:bg-color-700 hover:bg-color-400 dark:hover:bg-color-500 py-3 items-center text-color-100 w-full">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'HipButtonSbSmall'
}
</script>

<style scoped>
/* Transitions. */
button {
  transition: background-color 0.5s;
}
</style>