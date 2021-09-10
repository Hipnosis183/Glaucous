<template>
  <!-- Number of players input. -->
  <hip-input
    v-model="numberPlayers"
    label="Number of Players"
  ></hip-input>
</template>

<script>
// Import UI components.
import { HipInput } from '@/components/Component'

// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'FormGamePlatformNumberPlayers',
  components: {
    // UI components.
    HipInput
  },
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage forms in the store.
    const numberPlayers = computed({
      get() { return store.state.gameForm.gamePlatform.numberPlayers },
      set(value) { store.commit('setGamePlatformNumberPlayers', value) }
    })

    return {
      numberPlayers
    }
  }
}
</script>

<style>
</style>