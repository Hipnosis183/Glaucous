<template>
  <!-- Name input. -->
  <vi-input
    v-model="name"
    label="Name"
    placeholder="Required"
    required
  />
</template>

<script>
// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'FormTagName',
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage forms in the store.
    const name = computed({
      get() { return store.state.tagForm.name },
      set(value) { store.commit('setTagName', value) }
    })

    return {
      name
    }
  }
}
</script>

<style>
</style>