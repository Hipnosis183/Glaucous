<template>
  <transition>
    <div class="fixed flex h-full items-center justify-center w-overlay">
      <div
        @click="close"
        class="h-full w-full"
        :class="{ 'bg-black bg-opacity-50' : overlayColor }"
      >
      </div>
      <div
        class="absolute flex-col no-scrollbar overflow-x-scroll overflow-y-scroll"
        :class="[
          overlayRounded ? 'rounded-3xl' : '',
          overlayHeight ? overlayHeight : '',
          overlayWidth ? overlayWidth : ''
        ]"
        :style="[
          { maxHeight: 'calc(100vh - ' + overlayBorder + 'rem)' },
          { maxWidth: 'calc(100% - ' + overlayBorder + 'rem)' }
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
    overlayBorder: { type: Number, default: 4 },
    overlayColor: { type: Boolean, default: true },
    overlayHeight: { type: [Boolean, String] },
    overlayRounded: { type: Boolean, default: true },
    overlayWidth: { type: [Boolean, String] },
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
.w-overlay {
  width: calc(100% - 3.5rem);
}
</style>