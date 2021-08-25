<template>
  <button
    class="bg-theme-200 dark:bg-theme-900 px-3 text-theme-800 dark:text-theme-200"
    :class="[
      bottomElement || topElement ? 'h-1/2' : 'h-full py-2',
      { 'text-shadow' : $store.state.darkMode },
      { 'pb-1 rounded-br-xl' : bottomElement },
      { 'pt-1 rounded-tr-xl' : topElement },
      { 'rounded-l-xl' : firstElement },
      { 'rounded-r-xl' : lastElement }
    ]"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'HipInputButton',
  props: {
    bottomElement: { type: Boolean, default: false },
    firstElement: { type: Boolean, default: false },
    lastElement: { type: Boolean, default: false },
    topElement: { type: Boolean, default: false }
  }
}
</script>