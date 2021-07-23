<template>
  <div class="bg-white inline-flex justify-evenly shadow w-full">
    <button class="invisible py-3.5 w-0">-</button>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'HipNavBar'
}
</script>