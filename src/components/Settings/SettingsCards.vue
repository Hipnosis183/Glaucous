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
// Import UI components.
import {
  HipInputNum,
  HipOption,
  HipSectionContent,
  HipSectionHeader,
  HipSelect,
  HipSwitch
} from '../Component'
// Import settings objects and functions.
import {
  cardViews,
  imagePositions,
  selectCardColumns,
  textPositions
} from '../../settings'

export default {
  name: 'SettingsCards',
  components: {
    // UI components.
    HipInputNum,
    HipOption,
    HipSectionContent,
    HipSectionHeader,
    HipSelect,
    HipSwitch
  },
  data() {
    return {
      cardViews: cardViews,
      imagePositions: imagePositions,
      textPositions: textPositions
    }
  },
  computed: {
    cardMode: {
      get() { return this.$store.getters.getSettingsCardsCardMode },
      set(value) { this.$store.commit('setSettingsCardsCardMode', value) }
    },
    cardColumns: {
      get() { return this.$store.getters.getSettingsCardsCardColumns },
      set(value) {
        this.$store.commit('setSettingsCardsCardColumns', value)
        selectCardColumns(this.cardColumns)
      }
    },
    cardImageDisplay: {
      get() { return this.$store.getters.getSettingsCardsCardImageDisplay },
      set() { this.$store.commit('setSettingsCardsCardImageDisplay') }
    },
    cardImagePosition: {
      get() { return this.$store.getters.getSettingsCardsCardImagePosition },
      set(value) { this.$store.commit('setSettingsCardsCardImagePosition', value) }
    },
    cardTextDisplay: {
      get() { return this.$store.getters.getSettingsCardsCardTextDisplay },
      set() { this.$store.commit('setSettingsCardsCardTextDisplay') }
    },
    cardTextPosition: {
      get() { return this.$store.getters.getSettingsCardsCardTextPosition },
      set(value) { this.$store.commit('setSettingsCardsCardTextPosition', value) }
    }
  }
}
</script>

<style>
</style>