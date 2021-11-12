<template>
  <transition>
    <div class="fixed flex h-full items-center justify-center w-overlay">
      <div
        @click="close"
        class="h-full w-full"
        :class="{ 'bg-black bg-opacity-50' : overlay }"
      >
      </div>
      <div
        class="absolute flex-col no-scrollbar overflow-x-scroll overflow-y-scroll"
        :class="[
          rounded ? 'rounded-3xl' : '',
          height ? height : '',
          width ? width : ''
        ]"
        :style="[
          { maxHeight: 'calc(100vh - ' + border + 'rem)' },
          { maxWidth: 'calc(100% - ' + border + 'rem)' }
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
    border: { type: Number, default: 4 },
    height: { type: [Boolean, String] },
    overlay: { type: Boolean, default: true },
    rounded: { type: Boolean, default: true },
    width: { type: [Boolean, String] },
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