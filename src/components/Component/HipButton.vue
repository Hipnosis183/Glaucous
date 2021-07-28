<template>
  <button
    class="bg-gray-100 font-semibold h-full rounded-full shadow text-base text-theme-800"
    :class="[icon ? 'px-2 py-2' : 'px-4 py-2', large ? 'w-full' : 'w-max']"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'HipButton',
  props: [
    'icon',
    'large'
  ]
}
</script>