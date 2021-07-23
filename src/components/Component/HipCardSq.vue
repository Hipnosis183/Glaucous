<template>
  <div class="bg-white flex h-full items-center justify-center p-4 relative rounded-xl shadow text-center">
    <div class="absolute cursor-pointer h-full rounded-xl w-full"></div>
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