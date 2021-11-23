<template>
  <div
    class="bg-theme-0 dark:bg-theme-700 h-full p-6 shadow-color"
    :class="rounded ? rounded : 'rounded-3xl'"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ViModal',
  props: {
    rounded: { type: String }
  }
}
</script>

<style>
</style>