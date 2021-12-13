<template>
  <div class="relative z-5">
    <!-- Handle the bar's shadow without affecting child elements. -->
    <div class="absolute bar-shadow bg-theme-0 h-14 left-0 top-0 w-full" />
    <!-- Navigation bar. -->
    <div class="bg-theme-0 dark:bg-theme-700 h-14 inline-flex justify-evenly relative w-full">
      <!-- Contents. -->
      <slot />
      <div
        v-if="navSubtitle"
        class="inline-flex w-full"
      >
        <!-- Horizontal padding. -->
        <div class="w-full" />
        <div class="flex flex-col mr-4 my-auto text-right whitespace-nowrap">
          <!-- Page title. -->
          <p class="-mb-1 text-lg">{{ navTitle }}</p>
          <!-- Page subtitle. -->
          <p class="text-xs">{{ navSubtitle }}</p>
        </div>
      </div>
      <div
        v-else-if="navTitle"
        class="inline-flex w-full"
      >
        <!-- Horizontal padding. -->
        <div class="w-full" />
        <!-- Page title. -->
        <p class="mr-6 my-auto text-xl whitespace-nowrap">{{ navTitle }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViNavBar',
  props: {
    navTitle: { type: String },
    navSubtitle: { type: String }
  }
}
</script>

<style scoped>
/* Styling. */
.bar-shadow {
  filter: drop-shadow(0px 1px 1px rgba(var(--color-theme-800), 0.4));
}
.dark .bar-shadow {
  filter: drop-shadow(0px 1px 1px rgba(var(--color-theme-900), 0.6));
}
</style>