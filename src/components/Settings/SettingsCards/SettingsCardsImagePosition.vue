<template>
  <p class="text-xl">Image position</p>
  <hip-select
    v-model="cardImagePosition"
    class="w-max"
  >
    <hip-option
      v-for="item in imagePositions"
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
import { imagePositions } from '../../../settings'

export default {
  name: 'SettingsCardsImagePosition',
  components: {
    // UI components.
    HipOption,
    HipSelect
  },
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