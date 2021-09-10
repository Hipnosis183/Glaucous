<template>
  <!-- Group switch input. -->
  <hip-switch
    v-model="group"
    label="Group"
  />
</template>

<script>
// Import UI components.
import { HipSwitch } from '@/components/Component'

// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'FormPlatformGroup',
  components: {
    // UI components.
    HipSwitch
  },
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage forms in the store.
    const group = computed({
      get() { return store.state.platformForm.group },
      set(value) { store.commit('setPlatformGroup', value) }
    })

    return {
      group
    }
  }
}
</script>

<style>
</style>