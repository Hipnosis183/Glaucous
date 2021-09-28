<template>
  <!-- Option group label. -->
  <label class="flex my-2 px-5 text-theme-600 dark:text-theme-400 text-sm">{{ label }}</label>
  <!-- Option group contents. -->
  <slot></slot>
  <!-- Separator bar. -->
  <div class="border-b border-theme-600 dark:border-theme-500 flex mb-4 mt-2 mx-5" />
</template>

<script>
export default {
  name: 'ViOptionGroup',
  props: {
    label: { type: String }
  }
}
</script>

<style>
</style>