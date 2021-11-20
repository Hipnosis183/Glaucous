<template>
  <!-- Number of players select. -->
  <vi-select
    v-model="numberPlayers"
    select-clearable
    select-label="Players"
    select-placeholder="Undefined"
    class="w-full"
  >
    <vi-option
      v-for="item in numberPlayersOptions"
      :key="item.i"
      :option-label="item.name"
      :option-value="item.i"
    />
  </vi-select>
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
    const numberPlayersOptions = [
      { i: '1', name: '1 Player' },
      { i: '2', name: '2 Players' },
      { i: '3', name: '3 Players' },
      { i: '4', name: '4 Players' },
      { i: '4+', name: '4+ Players' }
    ]

    return {
      numberPlayers,
      numberPlayersOptions
    }
  }
}
</script>

<style>
</style>