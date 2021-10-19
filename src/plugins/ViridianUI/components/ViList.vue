<template>
  <ul
    class="grid"
    :class="$store.getters.getSettingsListsListSpacing ? 'gap-4' : 'gap-1'"
    :style="listDisplay == 0 ? 'grid-template-columns: repeat(' + listColumns  + ', minmax(0, 1fr))' : ''"
  >
    <slot></slot>
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
    const listColumns = computed(() => {
      return props.listPlatform
        ? store.getters.getSettingsPlatformOverSettingsOver
          ? store.getters.getSettingsPlatformOverListColumns
          : store.getters.getSettingsPlatformListColumns
        : store.getters.getSettingsPlatformListColumns
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
      listColumns,
      sentinel
    }
  }
}
</script>

<style>
</style>