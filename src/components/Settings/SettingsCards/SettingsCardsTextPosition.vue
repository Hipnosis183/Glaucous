<template>
  <p class="text-xl">Text position</p>
  <el-select v-model="cardTextPosition">
    <el-option
      v-for="item in textPositions"
      :key="item.i"
      :label="item.name"
      :value="item.i"
    >
      <p>{{ item.name }}</p>
    </el-option>
  </el-select>
</template>

<script>
// Import settings objects and functions.
import { textPositions } from '../../../settings'

export default {
  name: 'SettingsCardsTextPosition',
  data() {
    return {
      textPositions: textPositions
    }
  },
  computed: {
    cardTextPosition: {
      get() { return this.$store.state.cardTextPosition },
      set(value) { this.$store.commit('selectCardTextPosition', value) }
    }
  }
}
</script>

<style>
</style>