<template>
  <transition>
    <div class="flex items-center justify-center fixed h-full w-content">
      <div
        class="bg-black bg-opacity-50 w-full h-full"
        @click="$emit('close')"
      >
      </div>
      <div class="absolute flex-col rounded-xl overflow-y-scroll overflow-x-scroll no-scrollbar max-h-content max-w-content">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'HipOverlay'
}
</script>