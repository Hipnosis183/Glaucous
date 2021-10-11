<template>
  <!-- Select list grouping mode. -->
  <div
    v-if="groupSettings"
    class="flex-shrink-0 ml-2 my-auto w-40"
  >
    <vi-select
      v-model="listGroup"
      class="my-auto text-center"
    >
      <vi-option
        v-for="item in listGroupOptions"
        :key="item.i"
        :label="item.name"
        :value="item.i"
      >
      </vi-option>
    </vi-select>
  </div>
  <!-- Open list settings dialog. -->
  <div
    v-if="gameSettings"
    class="flex-shrink-0 ml-2 my-auto"
  >
    <vi-menu-button
      v-show="$store.getters.getSettingsGeneralEditMode"
      icon="icon-menu"
    >
      <div class="flex">
        <!-- List settings. -->
        <div class="text-center w-68">
          <h1 class="font-medium mb-5 -mt-1 text-lg">List Settings</h1>
          <div class="space-y-2">
            <!-- Toggle list cards spacing. -->
            <div class="flex h-10 items-center pl-4 pr-5">
              <p class="mr-auto">Spacing</p>
              <vi-switch v-model="listSpacing" />
            </div>
            <!-- List display mode. -->
            <div class="flex items-center px-4">
              <p class="mr-auto">Display</p>
              <div class="ml-auto w-34">
                <vi-select
                  v-model="listDisplay"
                  class="w-auto"
                >
                  <vi-option
                    v-for="item in listDisplayOptions"
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
              <p class="mr-auto">Columns</p>
              <div class="ml-auto w-32">
                <vi-input-num
                  v-model="listColumns"
                  :min="1"
                  :max="20"
                  position-side
                >
                </vi-input-num>
              </div>
            </div>
            <!-- Select card height for the grid display mode. -->
            <div class="flex items-center pl-4 pr-6">
              <p class="mr-auto">Height</p>
              <div class="ml-auto w-32">
                <vi-input-num
                  v-model="listHeight"
                  :min="1"
                  :max="1000"
                  position-side
                  :step="10"
                >
                </vi-input-num>
              </div>
            </div>
            <!-- Select card height for the grid display mode. -->
            <div class="flex items-center px-4">
              <p class="mr-auto">Presets</p>
              <div class="flex space-x-2">
                <vi-button @click="presetRound()">Round</vi-button>
                <vi-button @click="presetBlock()">Block</vi-button>
              </div>
            </div>
          </div>
        </div>
        <!-- Separator. -->
        <div class="bg-theme-200 dark:bg-theme-600 h-auto mt-2 mx-2 w-0.5" />
        <!-- Card settings. -->
        <div class="text-center w-68">
          <h1 class="font-medium mb-5 -mt-1 text-lg">Card Settings</h1>
          <div class="space-y-2">
            <!-- Toggle card scaling effect. -->
            <div class="flex h-10 items-center pl-4 pr-5">
              <p class="mr-auto">Scaling</p>
              <vi-switch v-model="cardScaling" />
            </div>
            <!-- Card corner modes. -->
            <div class="flex items-center px-4">
              <p class="mr-auto">Corners</p>
              <div class="ml-auto w-34">
                <vi-select
                  v-model="cardCorners"
                  class="w-auto"
                >
                  <vi-option
                    v-for="item in cornersOptions"
                    :key="item.i"
                    :label="item.name"
                    :value="item.i"
                  >
                  </vi-option>
                </vi-select>
              </div>
            </div>
            <!-- Card image display mode. -->
            <div class="flex items-center px-4">
              <p class="mr-auto">Images</p>
              <div class="ml-auto w-34">
                <vi-select
                  v-model="cardImages"
                  class="w-auto"
                >
                  <vi-option
                    v-for="item in cardImagesOptions"
                    :key="item.i"
                    :label="item.name"
                    :value="item.i"
                  >
                  </vi-option>
                </vi-select>
              </div>
            </div>
            <!-- Card text display mode. -->
            <div class="flex items-center px-4">
              <p class="mr-auto">Show Text</p>
              <div class="ml-auto w-34">
                <vi-select
                  v-model="cardTextShow"
                  class="w-auto"
                >
                  <vi-option
                    v-for="item in cardTextShowOptions"
                    :key="item.i"
                    :label="item.name"
                    :value="item.i"
                  >
                  </vi-option>
                </vi-select>
              </div>
            </div>
            <!-- Card text height mode. -->
            <div class="flex items-center px-4">
              <p class="mr-auto">Text Style</p>
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
import { cardImagesOptions, cardTextShowOptions, cardTextStyleOptions, cornersOptions, listDisplayOptions, listGroupOptions, selectCardCorners, selectListColumns } from '@/settings'

export default {
  name: 'SettingsLists',
  props: {
    gameSettings: { type: Boolean, default: false },
    groupSettings: { type: Boolean, default: false }
  },
  setup() {
    // Instantiate Vue elements.
    const router = useRouter()
    const store = useStore()

    // Manage settings in the store.
    const listSpacing = computed({
      get() { return store.getters.getSettingsListsListSpacing },
      set(value) { store.commit('setSettingsListsListSpacing', value) }
    })
    const listDisplay = computed({
      get() { return store.getters.getSettingsListsListDisplay },
      set(value) { store.commit('setSettingsListsListDisplay', value) }
    })
    const listColumns = computed({
      get() { return store.getters.getSettingsListsListColumns },
      set(value) {
        store.commit('setSettingsListsListColumns', value)
        selectListColumns(listColumns.value)
      }
    })
    const listHeight = computed({
      get() { return store.getters.getSettingsListsListHeight },
      set(value) { store.commit('setSettingsListsListHeight', value) }
    })
    const cardScaling = computed({
      get() { return store.getters.getSettingsCardsCardScaling },
      set(value) { store.commit('setSettingsCardsCardScaling', value) }
    })
    const cardCorners = computed({
      get() { return store.getters.getSettingsCardsCardCorners },
      set(value) {
        store.commit('setSettingsCardsCardCorners', value)
        selectCardCorners(cardCorners.value)
      }
    })
    const cardImages = computed({
      get() { return store.getters.getSettingsCardsCardImages },
      set(value) { store.commit('setSettingsCardsCardImages', value) }
    })
    const cardTextShow = computed({
      get() { return store.getters.getSettingsCardsCardTextShow },
      set(value) { store.commit('setSettingsCardsCardTextShow', value) }
    })
    const cardTextStyle = computed({
      get() { return store.getters.getSettingsCardsCardTextStyle },
      set(value) { store.commit('setSettingsCardsCardTextStyle', value) }
    })

    // Manage game list group display page.
    const listGroup = computed({
      get() { return store.getters.getSettingsListsListGroup },
      set(value) {
        if (value != listGroup.value) {
          store.commit('setSettingsListsListGroup', value)
          switch (value) {
            // Load page with all games listed.
            case 0: router.push({ name: 'Games' })
              break
            // Load page with all platforms listed.
            case 1: router.push({ name: 'Platforms' })
              break
            // Load page with all developers listed.
            case 2: router.push({ name: 'Developers' })
              break
          }
        }
      }
    })

    // Manage preset settings.
    const presetRound = () => {
      listSpacing.value = true
      cardScaling.value = true
      cardCorners.value = 2
    }
    const presetBlock = () => {
      listSpacing.value = false
      cardScaling.value = false
      cardCorners.value = 0
    }

    return {
      cardCorners,
      cardImages,
      cardImagesOptions,
      cardScaling,
      cardTextStyle,
      cardTextStyleOptions,
      cardTextShow,
      cardTextShowOptions,
      cornersOptions,
      listColumns,
      listDisplay,
      listDisplayOptions,
      listGroupOptions,
      listGroup,
      listHeight,
      listSpacing,
      presetBlock,
      presetRound
    }
  }
}
</script>

<style>
</style>