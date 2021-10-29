<template>
  <transition>
    <div class="fixed flex h-full items-center justify-center w-overlay">
      <div
        @click="close"
        class="bg-black bg-opacity-50 h-full w-full"
      >
      </div>
      <div
        class="absolute flex-col max-h-overlay max-w-overlay no-scrollbar overflow-x-scroll overflow-y-scroll"
        :class="[
          rounded ? 'rounded-3xl' : '',
          height ? height : '',
          width ? width : ''
        ]"
      >
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
// Import utility functions.
import { throttle } from '@/utils/throttle'

export default {
  name: 'ViOverlay',
  emits: [
    'close'
  ],
  props: {
    height: { type: [Boolean, String] },
    rounded: { type: Boolean, default: true },
    width: { type: [Boolean, String] }
  },
  setup(props, { emit }) {
    // Throttle overlay closing function.
    const close = throttle(() => { emit('close') }, 1000)

    return {
      close
    }
  }
}
</script>

<style scoped>
/* Calculations. */
.max-h-overlay {
  max-height: calc(100vh - 4rem);
}
.max-w-overlay {
  max-width: calc(100% - 4rem);
}
.w-overlay {
  width: calc(100% - 3.5rem);
}
</style>