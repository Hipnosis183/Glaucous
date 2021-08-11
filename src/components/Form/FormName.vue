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
import { HipInput } from '../Component'

export default {
  name: 'FormName',
  components: {
    // UI components.
    HipInput
  },
  computed: {
    name: {
      get() { return this.$store.state.otherForm.name },
      set(value) { this.$store.commit('setOtherName', value) }
    }
  }
}
</script>

<style>
</style>