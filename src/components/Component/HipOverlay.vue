<template>
  <div
    class="transform ease-in-out transition-all duration-1000 flex items-center justify-center fixed h-full"
    :class="$store.state.sidenavExpanded ? 'w-exp' : 'w-cont'"
  >
    <div
      class="bg-black bg-opacity-50 w-full h-full"
      @click="$emit('close')"
    >
    </div>
    <div class="absolute flex-col rounded-xl overflow-y-scroll overflow-x-scroll no-scrollbar max-h-almost max-w-almost">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HipOverlay'
}
</script>