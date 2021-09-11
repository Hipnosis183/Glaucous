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
// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'FormDeveloperName',
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage forms in the store.
    const name = computed({
      get() { return store.state.developerForm.name },
      set(value) { store.commit('setDeveloperName', value) }
    })

    return {
      name
    }
  }
}
</script>

<style>
</style>