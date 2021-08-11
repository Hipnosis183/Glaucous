<template>
  <!-- Number of players input. -->
  <hip-input
    v-model="numberPlayers"
    label="Number of Players"
  ></hip-input>
</template>

<script>
// Import UI components.
import { HipInput } from '../Component'

export default {
  name: 'FormNumberPlayers',
  components: {
    // UI components.
    HipInput
  },
  computed: {
    numberPlayers: {
      get() { return this.$store.state.gameForm.gamePlatform.numberPlayers },
      set(value) { this.$store.commit('setGamePlatformNumberPlayers', value) }
    }
  }
}
</script>

<style>
</style>