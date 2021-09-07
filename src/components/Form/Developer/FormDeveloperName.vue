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
  name: 'FormDeveloperName',
  components: {
    // UI components.
    HipInput
  },
  computed: {
    name: {
      get() { return this.$store.state.developerForm.name },
      set(value) { this.$store.commit('setDeveloperName', value) }
    }
  }
}
</script>

<style>
</style>