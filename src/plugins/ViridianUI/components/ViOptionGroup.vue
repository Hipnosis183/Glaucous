<template>
  <!-- Option group label. -->
  <label class="flex my-2 px-5 text-theme-600 dark:text-theme-400 text-sm">{{ optionLabel }}</label>
  <!-- Option group contents. -->
  <slot />
  <!-- Separator bar. -->
  <div
    v-if="!optionLast"
    class="border-b border-theme-400 dark:border-theme-500 flex mb-4 mt-2 mx-5"
  />
</template>

<script>
export default {
  name: 'ViOptionGroup',
  props: {
    optionLabel: { type: String },
    optionLast: { type: Boolean, default: false }
  }
}
</script>

<style>
</style>