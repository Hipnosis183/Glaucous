<template>
  <p class="text-xl">Image position</p>
  <el-select v-model="cardImagePosition">
    <el-option
      v-for="item in imagePositions"
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
import { imagePositions } from '../../../settings'

export default {
  name: 'SettingsCardsImagePosition',
  data() {
    return {
      imagePositions: imagePositions
    }
  },
  computed: {
    cardImagePosition: {
      get() { return this.$store.state.cardImagePosition },
      set(value) { this.$store.commit('selectCardImagePosition', value) }
    }
  }
}
</script>

<style>
</style>