<template>
  <!-- Option item. -->
  <li
    @click="method"
    class="hover:bg-theme-200 dark:hover:bg-theme-600 relative"
  >
    <!-- Option overlay. -->
    <div class="absolute cursor-pointer h-full w-full" />
    <!-- Option container. -->
    <div class="px-4 py-2">
      <slot>
        <!-- Default option content. -->
        <p>{{ label }}</p>
      </slot>
    </div>
  </li>
</template>

<script>
export default {
  name: 'ViMenuOption',
  props: {
    label: { type: String },
    method: { type: Function }
  }
}
</script>

<style>
</style>