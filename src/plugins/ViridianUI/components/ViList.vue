<template>
  <ul
    class="grid"
    :class="$store.getters.getSettingsListsContentSpacing ? 'gap-4' : 'gap-1'"
    :style="listDisplay == 1 ? 'grid-template-columns: repeat(' + gridColumns  + ', minmax(0, 1fr))' : ''"
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
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'ViList',
  props: {
    listDisplay: { type: Number, default: 0 },
    listPlatform: { type: Boolean, default: false },
    remoteMethod: { type: Function }
  },
  setup(props) {
    // Instantiate Vue elements.
    const store = useStore()

    // Declare template refs.
    const sentinel = ref(null)

    // Manage list columns.
    const gridColumns = computed(() => {
      return props.listPlatform
        ? typeof (store.getters.getSettingsPlatformOverGridColumns) == 'number'
          ? store.getters.getSettingsPlatformOverGridColumns
          : store.getters.getSettingsPlatformGridColumns
        : store.getters.getSettingsPlatformGridColumns
    })

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
      gridColumns,
      sentinel
    }
  }
}
</script>

<style>
</style>