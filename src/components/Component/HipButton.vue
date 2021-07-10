<template>
  <button
    class="w-max h-full bg-gray-300 font-semibold rounded-full text-base text-blue-800"
    :class="icon ? 'px-2 py-2' : 'px-4 py-2'"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'HipButton',
  props: ['icon']
}
</script>