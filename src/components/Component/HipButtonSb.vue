<template>
  <button class="bg-theme-100 dark:bg-theme-800 font-semibold m-auto py-3 rounded-full text-base text-color-800 dark:text-color-500 w-10/12">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'HipButtonSb'
}
</script>

<style scoped>
/* Transitions. */
button {
  transition: background-color 1s;
}
</style>