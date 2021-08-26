<template>
  <p class="text-xl">Text position</p>
  <hip-select
    v-model="cardTextPosition"
    class="w-max"
  >
    <hip-option
      v-for="item in textPositions"
      :key="item.i"
      :label="item.name"
      :value="item.i"
    >
    </hip-option>
  </hip-select>
</template>

<script>
// Import UI components.
import {
  HipOption,
  HipSelect
} from '../../Component'
// Import settings objects and functions.
import { textPositions } from '../../../settings'

export default {
  name: 'SettingsCardsTextPosition',
  components: {
    // UI components.
    HipOption,
    HipSelect
  },
  data() {
    return {
      textPositions: textPositions
    }
  },
  computed: {
    cardTextPosition: {
      get() { return this.$store.getters.getSettingsCardsCardTextPosition },
      set(value) { this.$store.commit('setSettingsCardsCardTextPosition', value) }
    }
  }
}
</script>

<style>
</style>