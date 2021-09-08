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
} from '@/components/Component'
// Import settings objects and functions.
import { cardViews } from '@/settings'

// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'SettingsCardsMode',
  components: {
    // UI components.
    HipOption,
    HipSelect
  },
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage settings in the store.
    const cardMode = computed({
      get() { return store.getters.getSettingsCardsCardMode },
      set(value) { store.commit('setSettingsCardsCardMode', value) }
    })

    return {
      cardMode,
      cardViews
    }
  }
}
</script>

<style>
</style>