<template>
  <div class="space-y-6">
    <vi-section-header section-label="List Settings">
      <!-- Toggle scaling effect. -->
      <vi-section-content>
        <p>Scaling Effect</p>
        <vi-switch v-model="scalingEffect" />
      </vi-section-content>
      <!-- Toggle content spacing. -->
      <vi-section-content>
        <p>Content Spacing</p>
        <vi-switch v-model="contentSpacing" />
      </vi-section-content>
      <!-- Select corners rounding. -->
      <vi-section-content>
        <p>Corners Rounding</p>
        <vi-select
          v-model="cornersRounding"
          class="w-max"
        >
          <vi-option
            v-for="item in cornersRoundingOptions"
            :key="item.i"
            :option-label="item.name"
            :option-value="item.i"
          />
        </vi-select>
      </vi-section-content>
      <!-- Select card text display. -->
      <vi-section-content>
        <p>Card Text Display</p>
        <vi-select
          v-model="cardTextDisplay"
          class="w-max"
        >
          <vi-option
            v-for="item in cardTextDisplayOptions"
            :key="item.i"
            :option-label="item.name"
            :option-value="item.i"
          />
        </vi-select>
      </vi-section-content>
      <!-- Select card text styling. -->
      <vi-section-content>
        <p>Card Text Style</p>
        <vi-select
          v-model="cardTextStyle"
          class="w-max"
        >
          <vi-option
            v-for="item in cardTextStyleOptions"
            :key="item.i"
            :option-label="item.name"
            :option-value="item.i"
          />
        </vi-select>
      </vi-section-content>
      <!-- Select images display mode. -->
      <vi-section-content>
        <p>Images Display</p>
        <vi-select
          v-model="imagesDisplay"
          class="w-max"
        >
          <vi-option
            v-for="item in imagesDisplayOptions"
            :key="item.i"
            :option-label="item.name"
            :option-value="item.i"
          />
        </vi-select>
      </vi-section-content>
      <!-- Select display mode. -->
      <vi-section-content>
        <p>Display Mode</p>
        <vi-select
          v-model="displayMode"
          class="w-max"
        >
          <vi-option
            v-for="item in displayModeOptions"
            :key="item.i"
            :option-label="item.name"
            :option-value="item.i"
          />
        </vi-select>
      </vi-section-content>
      <!-- Select number of columns for the grid display mode. -->
      <vi-section-content>
        <p>Grid Columns</p>
        <vi-input-num
          v-model="gridColumns"
          :input-min="1"
          :input-max="20"
        />
      </vi-section-content>
      <!-- Select rows height for the grid display mode. -->
      <vi-section-content>
        <p>Grid Row Height</p>
        <vi-input-num
          v-model="gridHeight"
          :input-min="1"
          :input-max="1000"
          :input-step="10"
        />
      </vi-section-content>
    </vi-section-header>
  </div>
</template>

<script>
// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'
// Import settings objects and functions.
import { cornersRoundingOptions, cardTextDisplayOptions, cardTextStyleOptions, displayModeOptions, imagesDisplayOptions, selectListCornersRounding } from '@/settings'

export default {
  name: 'SettingsLists',
  props: {
    listPlatform: { type: Boolean, default: false }
  },
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage list settings in the store.
    const scalingEffect = computed({
      get() { return store.getters.getSettingsListsScalingEffect },
      set(value) { store.commit('setSettingsListsScalingEffect', value) }
    })
    const contentSpacing = computed({
      get() { return store.getters.getSettingsListsContentSpacing },
      set(value) { store.commit('setSettingsListsContentSpacing', value) }
    })
    const cornersRounding = computed({
      get() { return store.getters.getSettingsListsCornersRounding },
      set(value) {
        store.commit('setSettingsListsCornersRounding', value)
        selectListCornersRounding(cornersRounding.value)
      }
    })
    const cardTextDisplay = computed({
      get() { return store.getters.getSettingsListsCardTextDisplay },
      set(value) { store.commit('setSettingsListsCardTextDisplay', value) }
    })
    const cardTextStyle = computed({
      get() { return store.getters.getSettingsListsCardTextStyle },
      set(value) { store.commit('setSettingsListsCardTextStyle', value) }
    })
    const displayMode = computed({
      get() { return store.getters.getSettingsListsDisplayMode },
      set(value) { store.commit('setSettingsListsDisplayMode', value) }
    })

    // Manage images settings.
    const imagesFiltering = computed({
      get() { return store.getters.getSettingsPlatformOverImagesFiltering },
      set(value) { store.commit('setSettingsPlatformOverImagesFiltering', value) }
    })
    const imagesDisplay = computed({
      get() { return store.getters.getSettingsPlatformImagesDisplay },
      set(value) { store.commit('setSettingsPlatformImagesDisplay', value) }
    })

    // Manage lists columns.
    const gridColumns = computed({
      get() { return store.getters.getSettingsPlatformGridColumns },
      set(value) { store.commit('setSettingsPlatformGridColumns', value) }
    })

    // Manage lists row height.
    const gridHeight = computed({
      get() { return store.getters.getSettingsPlatformGridHeight },
      set(value) { store.commit('setSettingsPlatformGridHeight', value) }
    })

    return {
      cardTextDisplay,
      cardTextDisplayOptions,
      cardTextStyle,
      cardTextStyleOptions,
      contentSpacing,
      cornersRounding,
      cornersRoundingOptions,
      displayMode,
      displayModeOptions,
      gridColumns,
      gridHeight,
      imagesDisplay,
      imagesDisplayOptions,
      imagesFiltering,
      scalingEffect,
    }
  }
}
</script>

<style lang="postcss" scoped>
/* Styling. */
p {
  @apply text-lg;
}
</style>