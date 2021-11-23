<template>
  <div class="mb-10 mx-1">
    <div class="mb-6 w-full">
      <h6 class="bg-transition pb-2 text-xl text-color-800 dark:text-color-500">
        {{ sectionLabel }}
      </h6>
      <div class="border-b-2 border-color-800 dark:border-color-500 border-transition" />
    </div>
    <div class="space-y-4">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViSectionHeader',
  props: {
    sectionLabel: { type: String, required: true }
  }
}
</script>

<style scoped>
/* Transitions. */
.border-transition {
  filter: drop-shadow(2px 2px 0px rgba(var(--color-theme-900), 0.6));
  transition: border-color 1s;
}
.bg-transition {
  filter: drop-shadow(2px 2px 0px rgba(var(--color-theme-900), 1));
  transition: color 1s;
}
</style>