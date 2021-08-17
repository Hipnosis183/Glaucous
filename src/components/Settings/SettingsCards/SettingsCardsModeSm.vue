<template>
  <hip-select
    v-model="cardMode"
    class="w-auto"
  >
    <hip-option
      v-for="item in cardViews"
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
import { cardViews } from '../../../settings'

export default {
  name: 'SettingsCardsModeSm',
  components: {
    // UI components.
    HipOption,
    HipSelect
  },
  data() {
    return {
      cardViews: cardViews
    }
  },
  computed: {
    cardMode: {
      get() { return this.$store.state.cardMode },
      set(value) { this.$store.commit('selectCardMode', value) }
    }
  }
}
</script>

<style>
</style>