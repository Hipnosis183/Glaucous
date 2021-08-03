<template>
  <p class="text-xl">Columns</p>
  <el-input-number
    v-model="cardColumns"
    :min="1"
    :max="10"
  ></el-input-number>
</template>

<script>
// Import settings objects and functions.
import { selectCardColumns } from '../../../settings'

export default {
  name: 'SettingsCardsColumns',
  computed: {
    cardColumns: {
      get() { return this.$store.state.cardColumns },
      set(value) {
        this.$store.commit('selectCardColumns', value)
        selectCardColumns(this.cardColumns)
      }
    }
  }
}
</script>

<style>
</style>