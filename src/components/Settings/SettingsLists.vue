<template>
  <!-- View settings dialog. -->
  <vi-dialog
    v-show="settingsDialog"
    @close="settingsShow()"
    class="pos-initial z-10"
  >
    <!-- Header. -->
    <div class="flex justify-between mb-6 mx-2">
      <!-- Title. -->
      <p class="mr-10 pt-1 text-2xl">List Settings</p>
      <!-- Buttons. -->
      <vi-button
        button-icon="icon-close"
        @click="settingsShow()"
      />
    </div>
    <!-- Separator. -->
    <div class="bg-theme-200 dark:bg-theme-600 h-0.5 my-4 w-full" />
    <!-- List settings. -->
    <div class="flex space-x-10">
      <!-- Left panel. -->
      <div class="flex">
        <!-- Settings text. -->
        <div class="mr-6 space-y-2 whitespace-nowrap">
          <div
            v-if="listPlatform"
            class="flex h-10 items-center"
          >
            <p>Images Filtering</p>
          </div>
          <div class="flex h-10 items-center">
            <p>Scaling Effect</p>
          </div>
          <div class="flex h-10 items-center">
            <p>Content Spacing</p>
          </div>
          <div class="flex h-10 items-center">
            <p>Corners Rounding</p>
          </div>
          <div class="flex h-10 items-center">
            <p>Card Text Display</p>
          </div>
          <div class="flex h-10 items-center">
            <p>Card Text Style</p>
          </div>
        </div>
        <!-- Settings controllers. -->
        <div class="space-y-2 w-36">
          <!-- Toggle images filtering. -->
          <div
            v-if="listPlatform"
            class="flex h-10 items-center"
          >
            <vi-switch
              v-model="imagesFiltering"
              class="ml-auto"
            />
          </div>
          <!-- Toggle scaling effect. -->
          <div class="flex h-10 items-center">
            <vi-switch
              v-model="scalingEffect"
              class="ml-auto"
            />
          </div>
          <!-- Toggle content spacing. -->
          <div class="flex h-10 items-center">
            <vi-switch
              v-model="contentSpacing"
              class="ml-auto"
            />
          </div>
          <!-- Select corners rounding. -->
          <vi-select
            v-model="cornersRounding"
            class="w-auto"
          >
            <vi-option
              v-for="item in cornersRoundingOptions"
              :key="item.i"
              :option-label="item.name"
              :option-value="item.i"
            />
          </vi-select>
          <!-- Select card text display. -->
          <vi-select
            v-model="cardTextDisplay"
            class="w-auto"
          >
            <vi-option
              v-for="item in cardTextDisplayOptions"
              :key="item.i"
              :option-label="item.name"
              :option-value="item.i"
            />
          </vi-select>
          <!-- Select card text styling. -->
          <vi-select
            v-model="cardTextStyle"
            class="w-auto"
          >
            <vi-option
              v-for="item in cardTextStyleOptions"
              :key="item.i"
              :option-label="item.name"
              :option-value="item.i"
            />
          </vi-select>
        </div>
      </div>
      <!-- Right panel. -->
      <div class="flex flex-col space-y-2">
        <!-- Settings list. -->
        <div class="flex">
          <!-- Settings text. -->
          <div class="mr-6 space-y-2 whitespace-nowrap">
            <div
              v-if="listPlatform"
              class="flex invisible mb-6"
            >
              <p>Placeholder</p>
            </div>
            <div class="flex h-10 items-center">
              <p>Images Display</p>
            </div>
            <div class="flex h-10 items-center">
              <p>Display Mode</p>
            </div>
            <div class="flex h-10 items-center">
              <p>Grid Columns</p>
            </div>
            <div class="flex h-10 items-center">
              <p>Grid Row Height</p>
            </div>
            <div
              v-if="listPlatform"
              class="flex h-10 items-center"
            >
              <p>Presets</p>
            </div>
          </div>
          <!-- Settings controllers. -->
          <div
            class="space-y-2"
            :class="listPlatform ? 'w-80' : 'w-36'"
          >
            <!-- Header. -->
            <div
              v-if="listPlatform"
              class="flex mb-4 mt-2 text-theme-700 dark:text-theme-200 w-full"
            >
              <div class="flex justify-center w-1/2">Global</div>
              <div class="flex justify-center w-1/2">Overwrite</div>
            </div>
            <!-- Select images display mode. -->
            <div class="flex space-x-2">
              <vi-select
                v-model="imagesDisplay"
                class="w-auto"
              >
                <vi-option
                  v-for="item in imagesDisplayOptions"
                  :key="item.i"
                  :option-label="item.name"
                  :option-value="item.i"
                />
              </vi-select>
              <vi-select
                v-if="listPlatform"
                v-model="imagesDisplayOver"
                class="w-auto"
              >
                <vi-option
                  option-label="- Global -"
                  :option-value="0"
                  class="text-center"
                />
                <vi-option
                  v-for="item in imagesDisplayOptions"
                  :key="item.i"
                  :option-label="item.name"
                  :option-value="item.i"
                />
              </vi-select>
            </div>
            <!-- Select display mode. -->
            <div class="flex space-x-2">
              <vi-select
                v-model="displayMode"
                class="w-auto"
              >
                <vi-option
                  v-for="item in displayModeOptions"
                  :key="item.i"
                  :option-label="item.name"
                  :option-value="item.i"
                />
              </vi-select>
              <vi-select
                v-if="listPlatform"
                v-model="displayModeOver"
                class="w-auto"
              >
                <vi-option
                  option-label="- Global -"
                  :option-value="0"
                  class="text-center"
                />
                <vi-option
                  v-for="item in displayModeOptions"
                  :key="item.i"
                  :option-label="item.name"
                  :option-value="item.i"
                />
              </vi-select>
            </div>
            <!-- Select number of columns for the grid display mode. -->
            <div class="flex items-center space-x-2">
              <vi-input-num
                v-model="gridColumns"
                :input-min="1"
                :input-max="20"
                input-side
              />
              <vi-switch
                v-if="listPlatform"
                v-model="gridColumnsOverwrite"
              />
              <vi-input-num
                v-if="listPlatform"
                v-model="gridColumnsOver"
                :input-min="1"
                :input-max="20"
                input-side
              />
            </div>
            <!-- Select rows height for the grid display mode. -->
            <div class="flex items-center space-x-2">
              <vi-input-num
                v-model="gridHeight"
                :input-min="1"
                :input-max="1000"
                input-side
                :input-step="10"
              />
              <vi-switch
                v-if="listPlatform"
                v-model="gridHeightOverwrite"
              />
              <vi-input-num
                v-if="listPlatform"
                v-model="gridHeightOver"
                :input-min="1"
                :input-max="1000"
                input-side
                :input-step="10"
              />
            </div>
            <!-- Load settings presets. -->
            <div
              v-if="listPlatform"
              class="flex space-x-2"
            >
              <vi-button
                button-large
                @click="presetBlock()"
              >Block</vi-button>
              <vi-button
                button-large
                @click="presetRound()"
              >Round</vi-button>
            </div>
          </div>
        </div>
        <!-- Load settings presets. -->
        <div
          v-if="!listPlatform"
          class="flex -ml-1 space-x-2"
        >
          <vi-button
            button-large
            @click="presetBlock()"
          >Preset: Block</vi-button>
          <vi-button
            button-large
            @click="presetRound()"
          >Preset: Round</vi-button>
        </div>
      </div>
    </div>
  </vi-dialog>
  <!-- Open settings dialog. -->
  <div class="ml-2 my-auto">
    <vi-button
      button-small="icon-options-sm"
      @click="settingsShow()"
    />
  </div>
  <!-- Select category to list. -->
  <div
    v-if="gameCategory"
    class="flex-shrink-0 ml-2 my-auto"
  >
    <vi-menu-select
      :menu-offset="[0, 20]"
      menu-placement="bottom"
      menu-small="icon-category"
      class="my-auto text-center"
    >
      <vi-menu-option
        v-for="item in gameCategoryOptions"
        :key="item.i"
        :menu-label="item.name"
        :menu-method="() => { $router.push({ name: item.value }) }"
      />
    </vi-menu-select>
  </div>
  <!-- Select list display mode. -->
  <div class="ml-2 my-auto">
    <vi-menu-select
      :menu-offset="[0, 20]"
      menu-placement="bottom"
      menu-small="icon-grid"
      class="my-auto text-center"
    >
      <!-- Overwrite display mode. -->
      <div v-if="listPlatform && displayModeOver > 0">
        <vi-menu-option
          v-for="item in displayModeOptions"
          :key="item.i"
          :menu-label="item.name"
          :menu-method="() => { displayModeOver = item.i }"
        />
      </div>
      <!-- Normal display mode. -->
      <div v-else>
        <vi-menu-option
          v-for="item in displayModeOptions"
          :key="item.i"
          :menu-label="item.name"
          :menu-method="() => { displayMode = item.i }"
        />
      </div>
    </vi-menu-select>
  </div>
</template>

<script>
// Import Vue functions.
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
// Import settings objects and functions.
import { cornersRoundingOptions, cardTextDisplayOptions, cardTextStyleOptions, displayModeOptions, gameCategoryOptions, imagesDisplayOptions, selectListCornersRounding } from '@/settings'

export default {
  name: 'SettingsLists',
  props: {
    gameCategory: { type: Boolean, default: false },
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
    const displayModeOver = computed({
      get() { return store.getters.getSettingsPlatformOverDisplayMode },
      set(value) { store.commit('setSettingsPlatformOverDisplayMode', value) }
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
    const imagesDisplayOver = computed({
      get() { return store.getters.getSettingsPlatformOverImagesDisplay },
      set(value) { store.commit('setSettingsPlatformOverImagesDisplay', value) }
    })

    // Manage lists columns.
    const gridColumns = computed({
      get() { return store.getters.getSettingsPlatformGridColumns },
      set(value) { store.commit('setSettingsPlatformGridColumns', value) }
    })
    const gridColumnsOver = computed({
      get() { return parseInt(store.getters.getSettingsPlatformOverGridColumns) },
      set(value) { store.commit('setSettingsPlatformOverGridColumns', value) }
    })
    const gridColumnsOverwrite = computed({
      get() { return typeof (store.getters.getSettingsPlatformOverGridColumns) == 'number' ? true : false },
      set(value) {
        let overwrite = value
          ? parseInt(store.getters.getSettingsPlatformOverGridColumns)
          : store.getters.getSettingsPlatformOverGridColumns.toString()
        store.commit('setSettingsPlatformOverGridColumns', overwrite)
      }
    })

    // Manage lists row height.
    const gridHeight = computed({
      get() { return store.getters.getSettingsPlatformGridHeight },
      set(value) { store.commit('setSettingsPlatformGridHeight', value) }
    })
    const gridHeightOver = computed({
      get() { return parseInt(store.getters.getSettingsPlatformOverGridHeight) },
      set(value) { store.commit('setSettingsPlatformOverGridHeight', value) }
    })
    const gridHeightOverwrite = computed({
      get() { return typeof (store.getters.getSettingsPlatformOverGridHeight) == 'number' ? true : false },
      set(value) {
        let overwrite = value
          ? parseInt(store.getters.getSettingsPlatformOverGridHeight)
          : store.getters.getSettingsPlatformOverGridHeight.toString()
        store.commit('setSettingsPlatformOverGridHeight', overwrite)
      }
    })

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

    // Manage settings dialog display.
    let settingsDialog = ref(false)
    const settingsShow = () => {
      settingsDialog.value = !settingsDialog.value
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
      displayModeOver,
      gameCategoryOptions,
      gridColumns,
      gridColumnsOver,
      gridColumnsOverwrite,
      gridHeight,
      gridHeightOver,
      gridHeightOverwrite,
      imagesDisplay,
      imagesDisplayOptions,
      imagesDisplayOver,
      imagesFiltering,
      presetBlock,
      presetRound,
      scalingEffect,
      settingsDialog,
      settingsShow
    }
  }
}
</script>

<style>
</style>