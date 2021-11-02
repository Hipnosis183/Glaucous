<template>
  <button
    class="dark:bg-theme-800 dark:hover:bg-color-800 py-2 shadow-color text-base whitespace-nowrap"
    :class="[
      $store.getters.getSettingsThemesDarkMode ? 'text-shadow' : '',
      buttonIcon || firstElement || middleElement || lastElement ? 'text-color-800 dark:text-color-500' : 'text-theme-800 dark:text-theme-200',
      buttonIcon || buttonSmall ? 'px-2' : 'px-4',
      buttonIcon ? 'h-full rounded-full' : 'rounded-xl',
      buttonLarge ? 'w-full' : 'w-max',
      buttonSmall ? 'bg-theme-200 hover:bg-color-200' : 'bg-theme-100 hover:bg-color-200 h-10',
      firstElement ? 'rounded-r-none' : '',
      middleElement ? 'rounded-l-none rounded-r-none' : '',
      lastElement ? 'rounded-l-none' : ''
    ]"
  >
    <vi-icon
      v-if="buttonIcon"
      :class="{ 'icon-shadow' : $store.getters.getSettingsThemesDarkMode }"
      class="w-icon"
    >
      <component :is="buttonIcon" />
    </vi-icon>
    <vi-icon
      v-if="buttonSmall"
      :class="{ 'icon-shadow' : $store.getters.getSettingsThemesDarkMode }"
      class="w-4"
    >
      <component :is="buttonSmall" />
    </vi-icon>
    <slot />
  </button>
</template>

<script>
export default {
  name: 'ViButton',
  props: {
    buttonIcon: { type: String, default: '' },
    buttonLarge: { type: Boolean, default: false },
    buttonSmall: { type: String, default: '' },
    firstElement: { type: Boolean, default: false },
    middleElement: { type: Boolean, default: false },
    lastElement: { type: Boolean, default: false }
  }
}
</script>

<style scoped>
/* Styling. */
.w-icon {
  width: 1.55rem;
}
/* Transitions. */
button {
  transition: background-color 0.4s, opacity 0.4s ease;
}
</style>