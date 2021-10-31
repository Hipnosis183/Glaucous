<template>
  <!-- Option group label. -->
  <label class="flex mb-2 mt-4 px-4 text-theme-200 text-sm">{{ label }}</label>
  <!-- Option group contents. -->
  <slot />
</template>

<script>
export default {
  name: 'ViOptionGroupUI',
  props: {
    label: { type: String }
  }
}
</script>

<style>
</style>