<template>
  <div>
    <div class="bg-theme-0 dark:bg-theme-700 h-14 inline-flex justify-evenly shadow-color w-full">
      <!-- Contents. -->
      <slot />
      <div
        v-if="title"
        class="inline-flex"
        :class="{ 'w-full' : !button }"
      >
        <!-- Horizontal padding. -->
        <div
          v-if="!button"
          class="w-full"
        />
        <!-- Page title. -->
        <p class="mr-6 my-auto text-xl whitespace-nowrap">{{ title }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViNavBar',
  props: {
    button: { type: Boolean, default: false },
    title: { type: String }
  }
}
</script>

<style>
</style>