<template>
  <!-- Name input. -->
  <hip-input
    v-model="name"
    label="Name"
    placeholder="Required"
    required
  ></hip-input>
</template>

<script>
// Import UI components.
import { HipInput } from '../../Component'

export default {
  name: 'FormPlatformName',
  components: {
    // UI components.
    HipInput
  },
  computed: {
    name: {
      get() { return this.$store.state.platformForm.name },
      set(value) { this.$store.commit('setPlatformName', value) }
    }
  }
}
</script>

<style>
</style>