<template>
  <div class="relative flex h-full bg-white p-4 rounded-xl shadow text-center items-center justify-center">
    <div class="absolute w-full h-full cursor-pointer rounded-xl"></div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HipCardSq'
}
</script>