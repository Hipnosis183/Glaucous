<template>
  <div class="mb-10 mx-1">
    <div class="mb-6 w-full">
      <h6 class="bg-transition cursor-default pb-2 text-xl text-color-800 dark:text-color-500">
        {{ sectionLabel }}
      </h6>
      <div class="border-b-2 border-color-800 dark:border-color-500 border-transition" />
    </div>
    <div :class="sectionSmall ? 'space-y-2' : 'space-y-4'">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViSectionHeader',
  props: {
    sectionLabel: { type: String, required: true },
    sectionSmall: { type: Boolean, required: false }
  }
}
</script>

<style scoped>
/* Transitions. */
.border-transition {
  transition: border-color 1s;
}
.dark .border-transition {
  filter: drop-shadow(2px 2px 0px rgba(var(--color-theme-900), 0.6));
  transition: filter 0.5s;
}
.bg-transition {
  transition: color 1s;
}
.dark .bg-transition {
  filter: drop-shadow(2px 2px 0px rgba(var(--color-theme-900), 1));
  transition: filter 0.5s;
}
</style>