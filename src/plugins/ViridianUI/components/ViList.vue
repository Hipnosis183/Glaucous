<template>
  <ul
    class="grid"
    :class="[
      { 'grid-cols-list' : listDisplay == 0 },
      $store.getters.getSettingsListsListSpacing ? 'gap-4' : 'gap-1'
    ]"
  >
    <slot />
  </ul>
  <div
    ref="sentinel"
    class="h-px w-px"
  />
</template>

<script>
// Import Vue functions.
import { onMounted, onUnmounted, ref, watch } from 'vue'

export default {
  name: 'ViList',
  props: {
    listDisplay: { type: Number, default: 0 },
    remoteMethod: { type: Function }
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
        props.remoteMethod()
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