<template>
  <div class="relative">
    <!-- Large button background. -->
    <div
      v-if="buttonLarge"
      class="absolute bg-color-500 cursor-pointer h-full opacity-50 hover:opacity-60 w-full"
    />
    <!-- Normal button background. -->
    <div
      v-else-if="$store.getters.getSettingsThemesDarkMode"
      class="absolute bg-color-800 hover:bg-color-600 cursor-pointer h-full rounded-2xl shadow-color w-full"
    />
    <div
      v-else
      class="absolute bg-color-500 hover:bg-color-400 cursor-pointer h-full opacity-60 rounded-2xl shadow-color w-full"
    />
    <!-- Button contents. -->
    <button
      class="cursor-pointer pointer-events-none text-base text-color-800 dark:text-color-200 w-max"
      :class="buttonLarge ? 'p-3.5' : 'p-2'"
    >
      <vi-icon
        v-if="buttonIcon"
        :class="[
          buttonLarge ? 'w-large' : 'w-normal',
          { 'icon-shadow' : $store.getters.getSettingsThemesDarkMode }
        ]"
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
.w-large {
  width: 1.85rem;
}
.w-normal {
  width: 1.6rem;
}
/* Transitions. */
div {
  transition: background-color 0.5s, opacity 0.5s ease;
}
</style>