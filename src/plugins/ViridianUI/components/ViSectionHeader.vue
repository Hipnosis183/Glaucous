<template>
  <div class="mb-10">
    <div class="mb-6 px-4 w-full">
      <h1 class="bg-transition border-b-2 border-color-800 dark:border-color-500 pb-2 text-xl">
        {{ sectionLabel }}
      </h1>
    </div>
    <div class="mx-6 space-y-6">
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
.bg-transition {
  transition: border-color 1s, color 1s;
}
</style>