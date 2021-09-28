<template>
  <!-- Number of players input. -->
  <vi-input
    v-model="numberPlayers"
    label="Number of Players"
  ></vi-input>
</template>

<script>
// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'FormGamePlatformNumberPlayers',
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