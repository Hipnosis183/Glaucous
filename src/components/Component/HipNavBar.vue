<template>
  <div class="bg-theme-0 dark:bg-theme-700 inline-flex justify-evenly shadow w-full">
    <!-- Vertical padding. -->
    <button class="invisible py-3.5 w-0">-</button>
    <!-- Contents. -->
    <slot></slot>
    <div
      v-if="title"
      class="inline-flex w-full"
    >
      <!-- Horizontal padding. -->
      <div class="w-full"></div>
      <!-- Page title. -->
      <p class="m-auto mr-6 text-xl whitespace-nowrap">{{ title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HipNavBar',
  props: [
    'title'
  ]
}
</script>