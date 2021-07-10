<template>
  <div class="inline-flex shadow bg-white w-full justify-evenly">
    <button class="invisible py-3.5 w-0">-</button>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'HipNavBar'
}
</script>