<template>
  <!-- Option item. -->
  <div
    @click="menuMethod"
    class="hover:bg-theme-200 dark:hover:bg-theme-600 duration-200 relative"
  >
    <!-- Option overlay. -->
    <div class="absolute cursor-pointer h-full w-full" />
    <!-- Option container. -->
    <div class="px-4 py-2">
      <slot>
        <!-- Default option content. -->
        <p>{{ menuLabel }}</p>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViMenuOption',
  props: {
    menuLabel: { type: String },
    menuMethod: { type: Function }
  }
}
</script>

<style>
</style>