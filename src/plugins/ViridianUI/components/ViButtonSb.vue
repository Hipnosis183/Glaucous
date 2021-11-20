<template>
  <button
    class=" font-medium text-xl w-full"
    :class="[
      buttonLarge ? 'h-16 pl-4 z-50' : '',
      buttonLarge || buttonSmall ? '' : 'h-14',
      buttonSmall
        ? 'bg-color-600 dark:bg-color-700 hover:bg-color-400 dark:hover:bg-color-500 py-3 text-color-100'
        : 'hover:bg-color-500 dark:hover:bg-color-600 text-color-200',
    ]"
  >
    <div
      class="flex h-full items-center w-full"
      :class="{ 'space-x-4' : !buttonSmall }"
    >
      <vi-icon
        v-if="buttonIcon"
        :icon-manual="buttonLarge"
        :class="buttonIconSize ? buttonIconSize : buttonSmall ? 'w-6' : 'w-8'"
      >
        <component :is="buttonIcon" />
      </vi-icon>
      <slot v-if="!buttonLarge" />
      <h6 v-else>
        <slot />
      </h6>
    </div>
  </button>
</template>

<script>
export default {
  name: 'ViButtonSb',
  props: {
    buttonIcon: { type: String, default: '' },
    buttonIconSize: { type: String, default: '' },
    buttonLarge: { type: Boolean, default: false },
    buttonSmall: { type: Boolean, default: false }
  }
}
</script>

<style scoped>
/* Styling. */
div {
  filter: drop-shadow(1px 1px 0px rgba(var(--color-theme-900), 0.6));
}
/* Transitions. */
button {
  transition: background-color 0.5s;
}
</style>