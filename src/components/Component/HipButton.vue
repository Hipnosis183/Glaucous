<template>
  <button
    class="bg-theme-100 dark:bg-theme-800 font-semibold h-full rounded-full shadow text-base text-color-800 dark:text-color-600"
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