<template>
  <!-- Game card background. -->
  <div class="bg-theme-0 dark:bg-theme-700 flex h-full overflow-hidden p-4 relative rounded-xl shadow-color">
    <!-- Game card overlay. -->
    <div class="absolute cursor-pointer h-full rounded-xl w-full z-5" />
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'HipCard'
}
</script>

<style>
</style>