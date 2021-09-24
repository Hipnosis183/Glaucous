<template>
  <div class="grid grid-cols-1 divide-x divide-theme-400">
    <div class="text-center my-2 w-64">
      <h1 class="font-medium mb-6 text-lg">List Settings</h1>
      <div class="space-y-2">
        <!-- Card view mode. -->
        <div class="flex items-center px-4">
          <p class="mr-auto">Display</p>
          <div class="ml-auto w-32">
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
          </div>
        </div>
        <!-- Select number of columns for card views. -->
        <div class="flex items-center pl-4 pr-6">
          <p class="mr-auto">Columns</p>
          <div class="ml-auto w-32">
            <hip-input-num
              v-model="cardColumns"
              :min="1"
              :max="20"
              position-side
            >
            </hip-input-num>
          </div>
        </div>
        <!-- Select height for card views. -->
        <div class="flex items-center pl-4 pr-6">
          <p class="mr-auto">Height</p>
          <div class="ml-auto w-32">
            <hip-input-num
              v-model="cardHeight"
              :min="1"
              :max="1000"
              position-side
              :step="10"
            >
            </hip-input-num>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'
// Import settings objects and functions.
import { cardViews, selectCardColumns } from '@/settings'

export default {
  name: 'SettingsLists',
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage settings in the store.
    const cardMode = computed({
      get() { return store.getters.getSettingsCardsCardMode },
      set(value) { store.commit('setSettingsCardsCardMode', value) }
    })
    const cardColumns = computed({
      get() { return store.getters.getSettingsCardsCardColumns },
      set(value) {
        store.commit('setSettingsCardsCardColumns', value)
        selectCardColumns(cardColumns.value)
      }
    })
    const cardHeight = computed({
      get() { return store.getters.getSettingsCardsCardHeight },
      set(value) { store.commit('setSettingsCardsCardHeight', value) }
    })

    return {
      cardMode,
      cardColumns,
      cardHeight,
      cardViews
    }
  }
}
</script>

<style>
</style>