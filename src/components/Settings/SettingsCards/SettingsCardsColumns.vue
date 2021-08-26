<template>
  <p class="text-xl">Columns</p>
  <hip-input-num
    v-model="cardColumns"
    :min="1"
    :max="10"
    position-side
  >
  </hip-input-num>
</template>

<script>
// Import UI components.
import { HipInputNum } from '../../Component'
// Import settings objects and functions.
import { selectCardColumns } from '../../../settings'

export default {
  name: 'SettingsCardsColumns',
  components: {
    // UI components.
    HipInputNum
  },
  computed: {
    cardColumns: {
      get() { return this.$store.getters.getSettingsCardsCardColumns },
      set(value) {
        this.$store.commit('setSettingsCardsCardColumns', value)
        selectCardColumns(this.cardColumns)
      }
    }
  }
}
</script>

<style>
</style>