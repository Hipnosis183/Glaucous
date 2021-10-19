<template>
  <!-- Select category to list. -->
  <div
    v-if="gameCategory"
    class="flex-shrink-0 ml-2 my-auto"
  >
    <vi-menu-select
      :offset="[0, 20]"
      placement="bottom"
      small="icon-category"
      class="my-auto text-center"
    >
      <vi-menu-option
        :label="gameCategoryOptions[0].name"
        :method="selectCategoryGames"
      />
      <vi-menu-option
        :label="gameCategoryOptions[1].name"
        :method="selectCategoryPlatforms"
      />
      <vi-menu-option
        :label="gameCategoryOptions[2].name"
        :method="selectCategoryDevelopers"
      />
    </vi-menu-select>
  </div>
  <!-- Open list settings dialog. -->
  <div class="flex-shrink-0 ml-2 my-auto">
    <vi-menu-button icon="icon-grid">
      <div v-if="!listPlatform">
        <h1 class="font-medium mb-3 -mt-1 text-center text-xl">List Settings</h1>
        <!-- Load settings presets. -->
        <div class="flex items-center mb-2 px-4">
          <p class="mr-auto">Load Presets</p>
          <div class="flex space-x-2">
            <vi-button @click="presetRound()">Round</vi-button>
            <vi-button @click="presetBlock()">Block</vi-button>
          </div>
        </div>
      </div>
      <div class="flex">
        <!-- List settings. -->
        <div class="text-center w-88">
          <h1
            v-if="listPlatform"
            class="font-medium mb-5 -mt-1 text-lg"
          >List Settings</h1>
          <div class="space-y-2">
            <!-- Toggle scaling effect. -->
            <div class="flex h-10 items-center pl-4 pr-5">
              <p class="mr-auto">Scaling Effect</p>
              <vi-switch v-model="scalingEffect" />
            </div>
            <!-- Toggle content spacing. -->
            <div class="flex h-10 items-center pl-4 pr-5">
              <p class="mr-auto">Content Spacing</p>
              <vi-switch v-model="contentSpacing" />
            </div>
            <!-- Select display mode. -->
            <div
              v-if="listPlatform"
              class="flex items-center px-4"
            >
              <p class="mr-auto">Display Mode</p>
              <div class="ml-auto w-34">
                <vi-select
                  v-model="displayMode"
                  class="w-auto"
                >
                  <vi-option
                    v-for="item in displayModeOptions"
                    :key="item.i"
                    :label="item.name"
                    :value="item.i"
                  >
                  </vi-option>
                </vi-select>
              </div>
            </div>
            <!-- Select corners rounding. -->
            <div class="flex items-center px-4">
              <p class="mr-auto">Corners Rounding</p>
              <div class="ml-auto w-34">
                <vi-select
                  v-model="cornersRounding"
                  class="w-auto"
                >
                  <vi-option
                    v-for="item in cornersRoundingOptions"
                    :key="item.i"
                    :label="item.name"
                    :value="item.i"
                  >
                  </vi-option>
                </vi-select>
              </div>
            </div>
            <!-- Select card text display. -->
            <div class="flex items-center px-4">
              <p class="mr-auto">Card Text Display</p>
              <div class="ml-auto w-34">
                <vi-select
                  v-model="cardTextDisplay"
                  class="w-auto"
                >
                  <vi-option
                    v-for="item in cardTextDisplayOptions"
                    :key="item.i"
                    :label="item.name"
                    :value="item.i"
                  >
                  </vi-option>
                </vi-select>
              </div>
            </div>
            <!-- Select card text styling. -->
            <div class="flex items-center px-4">
              <p class="mr-auto">Card Text Style</p>
              <div class="ml-auto w-34">
                <vi-select
                  v-model="cardTextStyle"
                  class="w-auto"
                >
                  <vi-option
                    v-for="item in cardTextStyleOptions"
                    :key="item.i"
                    :label="item.name"
                    :value="item.i"
                  >
                  </vi-option>
                </vi-select>
              </div>
            </div>
          </div>
        </div>
        <!-- Separator. -->
        <div class="bg-theme-200 dark:bg-theme-600 h-auto mt-2 mx-4 w-0.5" />
        <!-- Platform settings. -->
        <div class="text-center w-88">
          <h1
            v-if="listPlatform"
            class="font-medium mb-5 -mt-1 text-lg"
          >Platform Settings</h1>
          <div class="space-y-2">
            <!-- Toggle global settings overwrite. -->
            <div
              v-if="listPlatform"
              class="flex h-10 items-center pl-4 pr-5"
            >
              <p class="mr-auto">Global Settings Overwrite</p>
              <vi-switch v-model="settingsOver" />
            </div>
            <!-- Toggle images filtering. -->
            <div class="flex h-10 items-center pl-4 pr-5">
              <p class="mr-auto">Images Filtering</p>
              <vi-switch v-model="imagesFiltering" />
            </div>
            <!-- Select images display mode. -->
            <div class="flex items-center px-4">
              <p class="mr-auto">Images Display</p>
              <div class="ml-auto w-34">
                <vi-select
                  v-model="imagesDisplay"
                  class="w-auto"
                >
                  <vi-option
                    v-for="item in imagesDisplayOptions"
                    :key="item.i"
                    :label="item.name"
                    :value="item.i"
                  >
                  </vi-option>
                </vi-select>
              </div>
            </div>
            <!-- Select display mode. -->
            <div
              v-if="!listPlatform"
              class="flex items-center px-4"
            >
              <p class="mr-auto">Display Mode</p>
              <div class="ml-auto w-34">
                <vi-select
                  v-model="displayMode"
                  class="w-auto"
                >
                  <vi-option
                    v-for="item in displayModeOptions"
                    :key="item.i"
                    :label="item.name"
                    :value="item.i"
                  >
                  </vi-option>
                </vi-select>
              </div>
            </div>
            <!-- Select number of columns for the grid display mode. -->
            <div class="flex items-center pl-4 pr-6">
              <p class="mr-auto">Grid Columns</p>
              <div class="ml-auto w-32">
                <vi-input-num
                  v-model="gridColumns"
                  :min="1"
                  :max="20"
                  position-side
                >
                </vi-input-num>
              </div>
            </div>
            <!-- Select rows height for the grid display mode. -->
            <div class="flex items-center pl-4 pr-6">
              <p class="mr-auto">Grid Row Height</p>
              <div class="ml-auto w-32">
                <vi-input-num
                  v-model="gridHeight"
                  :min="1"
                  :max="1000"
                  position-side
                  :step="10"
                >
                </vi-input-num>
              </div>
            </div>
            <!-- Load settings presets. -->
            <div
              v-if="listPlatform"
              class="flex items-center px-4"
            >
              <p class="mr-auto">Load Presets</p>
              <div class="flex space-x-2">
                <vi-button @click="presetRound()">Round</vi-button>
                <vi-button @click="presetBlock()">Block</vi-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </vi-menu-button>
  </div>
</template>

<script>
// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
// Import settings objects and functions.
import { cornersRoundingOptions, cardTextDisplayOptions, cardTextStyleOptions, displayModeOptions, gameCategoryOptions, imagesDisplayOptions, selectListCornersRounding } from '@/settings'

export default {
  name: 'SettingsLists',
  props: {
    gameCategory: { type: Boolean, default: false },
    listPlatform: { type: Boolean, default: false }
  },
  setup(props) {
    // Instantiate Vue elements.
    const router = useRouter()
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
    const displayMode = computed({
      get() { return store.getters.getSettingsListsDisplayMode },
      set(value) { store.commit('setSettingsListsDisplayMode', value) }
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

    // Manage platform settings in the store.
    const settingsOver = computed({
      get() { return store.getters.getSettingsPlatformOverSettingsOver },
      set(value) { store.commit('setSettingsPlatformOverSettingsOver', value) }
    })
    const imagesFiltering = computed({
      get() {
        return props.listPlatform
          ? settingsOver.value
            ? store.getters.getSettingsPlatformOverImagesFiltering
            : store.getters.getSettingsPlatformImagesFiltering
          : store.getters.getSettingsPlatformImagesFiltering
      },
      set(value) {
        store.commit(props.listPlatform
          ? settingsOver.value
            ? 'setSettingsPlatformOverImagesFiltering'
            : 'setSettingsPlatformImagesFiltering'
          : 'setSettingsPlatformImagesFiltering', value)
      }
    })
    const imagesDisplay = computed({
      get() {
        return props.listPlatform
          ? settingsOver.value
            ? store.getters.getSettingsPlatformOverImagesDisplay
            : store.getters.getSettingsPlatformImagesDisplay
          : store.getters.getSettingsPlatformImagesDisplay
      },
      set(value) {
        store.commit(props.listPlatform
          ? settingsOver.value
            ? 'setgetSettingsPlatformOverImagesDisplay'
            : 'setSettingsPlatformImagesDisplay'
          : 'setSettingsPlatformImagesDisplay', value)
      }
    })
    const gridColumns = computed({
      get() {
        return props.listPlatform
          ? settingsOver.value
            ? store.getters.getSettingsPlatformOverGridColumns
            : store.getters.getSettingsPlatformGridColumns
          : store.getters.getSettingsPlatformGridColumns
      },
      set(value) {
        store.commit(props.listPlatform
          ? settingsOver.value
            ? 'setSettingsPlatformOverListColumns'
            : 'setSettingsPlatformGridColumns'
          : 'setSettingsPlatformGridColumns', value)
      }
    })
    const gridHeight = computed({
      get() {
        return props.listPlatform
          ? settingsOver.value
            ? store.getters.getSettingsPlatformOverGridHeight
            : store.getters.getSettingsPlatformGridHeight
          : store.getters.getSettingsPlatformGridHeight
      },
      set(value) {
        store.commit(props.listPlatform
          ? settingsOver.value
            ? 'setgetSettingsPlatformOverGridHeight'
            : 'setSettingsPlatformGridHeight'
          : 'setSettingsPlatformGridHeight', value)
      }
    })

    // Manage game category selection.
    const selectCategoryGames = () => {
      router.push({ name: 'Games' })
    }
    const selectCategoryPlatforms = () => {
      router.push({ name: 'Platforms' })
    }
    const selectCategoryDevelopers = () => {
      router.push({ name: 'Developers' })
    }

    // Manage preset settings.
    const presetRound = () => {
      contentSpacing.value = true
      scalingEffect.value = true
      cornersRounding.value = 2
    }
    const presetBlock = () => {
      contentSpacing.value = false
      scalingEffect.value = false
      cornersRounding.value = 0
    }

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
      gameCategoryOptions,
      gridColumns,
      gridHeight,
      imagesDisplay,
      imagesDisplayOptions,
      imagesFiltering,
      presetBlock,
      presetRound,
      scalingEffect,
      selectCategoryGames,
      selectCategoryDevelopers,
      selectCategoryPlatforms,
      settingsOver
    }
  }
}
</script>

<style>
</style>