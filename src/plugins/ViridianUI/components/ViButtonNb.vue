<template>
  <div class="relative">
    <!-- Button background. -->
    <div
      v-if="$store.getters.getSettingsThemesDarkMode"
      class="absolute bg-color-800 hover:bg-color-600 cursor-pointer h-full rounded-2xl shadow-color w-full"
    />
    <div
      v-else
      class="absolute bg-color-500 hover:bg-color-400 cursor-pointer h-full opacity-60 rounded-2xl shadow-color w-full"
    />
    <!-- Button contents. -->
    <button class="cursor-pointer p-2 pointer-events-none text-base text-color-800 dark:text-color-200 w-max">
      <vi-icon
        v-if="buttonIcon"
        class="w-button"
        :class="{ 'icon-shadow' : $store.getters.getSettingsThemesDarkMode }"
      >
        <component :is="buttonIcon" />
      </vi-icon>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ViButtonNb',
  props: {
    buttonIcon: { type: String, default: '' },
    buttonLarge: { type: Boolean, default: false }
  }
}
</script>

<style scoped>
/* Styling. */
.bar-shadow {
  filter: drop-shadow(0px 1px 1px rgba(var(--color-color-800), 0.2));
}
.w-button {
  width: 1.6rem;
}
/* Transitions. */
div {
  transition: background-color 0.5s, opacity 0.5s ease;
}
</style>