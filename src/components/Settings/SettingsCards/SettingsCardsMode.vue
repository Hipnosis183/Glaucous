<template>
  <p class="text-xl">View mode</p>
  <hip-select
    v-model="cardMode"
    class="w-max"
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
  name: 'SettingsCardsMode',
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