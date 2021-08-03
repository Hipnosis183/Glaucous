<template>
  <p class="text-xl">View mode</p>
  <el-select v-model="cardMode">
    <el-option
      v-for="item in cardViews"
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
import { cardViews } from '../../../settings'

export default {
  name: 'SettingsCardsMode',
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