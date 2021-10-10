<template>
  <!-- Game card background. -->
  <div
    class="bg-theme-0 dark:bg-theme-900 flex overflow-hidden relative rounded-xl shadow-color transform"
    :class="{ 'hover:scale-1005' : $store.getters.getSettingsCardsCardScaling }"
  >
    <!-- Game card overlay. -->
    <div class="absolute border-2 border-transparent hover:border-color-400 dark:hover:border-color-900 cursor-pointer h-full rounded-xl w-full z-5" />
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ViCard'
}
</script>

<style scoped>
/* Transitions. */
div {
  transition: border-color 0.2s;
}
</style>