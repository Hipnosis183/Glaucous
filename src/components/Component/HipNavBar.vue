<template>
  <div class="bg-theme-0 dark:bg-theme-700 inline-flex justify-evenly shadow w-full">
    <button class="invisible py-3.5 w-0">-</button>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'HipNavBar'
}
</script>