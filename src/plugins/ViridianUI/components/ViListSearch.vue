<template>
  <div
    class="flex-1 no-scrollbar overflow-y-scroll"
    :class="$store.getters.getSettingsListsContentSpacing ? 'p-4' : 'p-1 pr-0'"
  >
    <ul
      class="grid"
      :style="listDisplay == 1 && listLength < 4 ? 'grid-template-columns: repeat(' + listLength + ', minmax(0, 1fr));' : ''"
      :class="[
      { 'grid-cols-4' : listDisplay == 1 && listLength >= 4 },
      $store.getters.getSettingsListsContentSpacing ? 'gap-4' : 'gap-1'
    ]"
    >
      <slot />
    </ul>
    <div
      ref="sentinel"
      class="h-px w-px"
    />
  </div>
</template>

<script>
// Import Vue functions.
import { onMounted, onUnmounted, ref, watch } from 'vue'

export default {
  name: 'ViListSearch',
  props: {
    listDisplay: { type: Number, default: 0 },
    listLength: { type: Number, default: 4 },
    listRemoteMethod: { type: Function }
  },
  setup(props) {
    // Declare template refs.
    const sentinel = ref(null)

    // Manage infinite scrolling.
    let intersectionObserver = ref(null)
    let isIntersecting = ref(false)
    onMounted(() => {
      // Define and instantiate observer.
      intersectionObserver.value = new window.IntersectionObserver((entries) => {
        // Middleware to ensure only one intersection triggering.
        isIntersecting.value = entries[0].isIntersecting ? true : false
      })
      // Initiate the observer watcher.
      intersectionObserver.value.observe(sentinel.value)
    })
    onUnmounted(() => {
      // Disconnect the observer watcher.
      intersectionObserver.value.disconnect()
    })
    watch(() => isIntersecting, (value) => {
      // Execute remote method when reaching the end of the list.
      if (value) {
        props.listRemoteMethod()
      }
    })

    return {
      sentinel
    }
  }
}
</script>

<style>
</style>