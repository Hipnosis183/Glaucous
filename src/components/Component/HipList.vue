<template>
  <ul
    class="gap-4 grid"
    :class="{ 'grid-cols-view' : !manual }"
  >
    <slot />
  </ul>
  <div
    ref="sentinel"
    class="h-px w-px"
  />
</template>

<script>
export default {
  name: 'HipList',
  data() {
    return {
      intersectionObserver: null,
      isIntersecting: false
    }
  },
  props: {
    manual: { type: Boolean },
    remoteMethod: { type: Function }
  },
  mounted() {
    // Define and instantiate observer.
    this.intersectionObserver = new window.IntersectionObserver((entries) => {
      // Middleware to ensure only one intersection triggering.
      this.isIntersecting = entries[0].isIntersecting ? true : false
    })
    // Initiate the observer watcher.
    this.intersectionObserver.observe(this.$refs['sentinel'])
  },
  unmounted() {
    // Disconnect the observer watcher.
    this.intersectionObserver.disconnect()
  },
  watch: {
    isIntersecting(value) {
      // Execute remote method when reaching the end of the list.
      if (value) {
        this.remoteMethod()
      }
    }
  }
}
</script>

<style>
</style>