<template>
  <div class="bg-white p-4 h-full rounded-xl shadow text-center cursor-pointer flex items-center justify-center">
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