<template>
  <button
    class="bg-theme-200 dark:bg-theme-900 h-full px-4 py-2 text-theme-800 dark:text-theme-200"
    :class="[
      $store.state.darkMode ? 'text-shadow' : '',
      firstElement ? 'rounded-l-xl' : '',
      lastElement ? 'rounded-r-xl' : ''
    ]"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'HipInputButton',
  props: {
    firstElement: { type: Boolean, default: false },
    lastElement: { type: Boolean, default: false }
  }
}
</script>