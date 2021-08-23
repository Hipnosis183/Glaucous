<template>
  <!-- Group switch input. -->
  <hip-switch
    v-model="group"
    label="Group"
  />
</template>

<script>
// Import UI components.
import { HipSwitch } from '../Component'

export default {
  name: 'FormPlatformGroup',
  components: {
    // UI components.
    HipSwitch
  },
  computed: {
    group: {
      get() { return this.$store.state.platformForm.group },
      set(value) { this.$store.commit('setPlatformGroup', value) }
    }
  }
}
</script>

<style>
</style>