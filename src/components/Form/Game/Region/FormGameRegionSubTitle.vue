<template>
  <!-- Sub title input. -->
  <hip-input
    v-model="subTitle"
    label="Subtitle"
  ></hip-input>
</template>

<script>
// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'FormGameRegionSubTitle',
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage forms in the store.
    const subTitle = computed({
      get() { return store.state.gameForm.gameRegion.subTitle },
      set(value) { store.commit('setGameRegionSubTitle', value) }
    })

    return {
      subTitle
    }
  }
}
</script>

<style>
</style>