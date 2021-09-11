<template>
  <!-- Header. -->
  <hip-section-header label="Card Options">
    <!-- Card view mode. -->
    <hip-section-content>
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
    </hip-section-content>
    <!-- Select number of columns for card views. -->
    <hip-section-content>
      <p class="text-xl">Columns</p>
      <hip-input-num
        v-model="cardColumns"
        :min="1"
        :max="10"
        position-side
      >
      </hip-input-num>
    </hip-section-content>
    <!-- Card image display. -->
    <hip-section-content>
      <p class="text-xl">Image display</p>
      <hip-switch v-model="cardImageDisplay" />
    </hip-section-content>
    <!-- Card image position. -->
    <hip-section-content>
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
    </hip-section-content>
    <!-- Card text display. -->
    <hip-section-content>
      <p class="text-xl">Text display</p>
      <hip-switch v-model="cardTextDisplay" />
    </hip-section-content>
    <!-- Card text position. -->
    <hip-section-content>
      <p class="text-xl">Text position</p>
      <hip-select
        v-model="cardTextPosition"
        class="w-max"
      >
        <hip-option
          v-for="item in textPositions"
          :key="item.i"
          :label="item.name"
          :value="item.i"
        >
        </hip-option>
      </hip-select>
    </hip-section-content>
  </hip-section-header>
</template>

<script>
// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'
// Import settings objects and functions.
import { cardViews, imagePositions, selectCardColumns, textPositions } from '@/settings'

export default {
  name: 'SettingsCards',
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
    const cardImageDisplay = computed({
      get() { return store.getters.getSettingsCardsCardImageDisplay },
      set() { store.commit('setSettingsCardsCardImageDisplay') }
    })
    const cardImagePosition = computed({
      get() { return store.getters.getSettingsCardsCardImagePosition },
      set(value) { store.commit('setSettingsCardsCardImagePosition', value) }
    })
    const cardTextDisplay = computed({
      get() { return store.getters.getSettingsCardsCardTextDisplay },
      set() { store.commit('setSettingsCardsCardTextDisplay') }
    })
    const cardTextPosition = computed({
      get() { return store.getters.getSettingsCardsCardTextPosition },
      set(value) { store.commit('setSettingsCardsCardTextPosition', value) }
    })

    return {
      cardMode,
      cardColumns,
      cardImageDisplay,
      cardImagePosition,
      cardTextDisplay,
      cardTextPosition,
      cardViews,
      imagePositions,
      textPositions
    }
  }
}
</script>

<style>
</style>