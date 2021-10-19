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
            <!-- Toggle list scaling effect. -->
            <div class="flex h-10 items-center pl-4 pr-5">
              <p class="mr-auto">Scaling Effect</p>
              <vi-switch v-model="listScaling" />
            </div>
            <!-- Toggle list spacing. -->
            <div class="flex h-10 items-center pl-4 pr-5">
              <p class="mr-auto">Content Spacing</p>
              <vi-switch v-model="listSpacing" />
            </div>
            <!-- List display mode. -->
            <div
              v-if="listPlatform"
              class="flex items-center px-4"
            >
              <p class="mr-auto">Display Mode</p>
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
            <!-- List corner rounding. -->
            <div class="flex items-center px-4">
              <p class="mr-auto">Corners Rounding</p>
              <div class="ml-auto w-34">
                <vi-select
                  v-model="listCorners"
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
            <!-- List card text display mode. -->
            <div class="flex items-center px-4">
              <p class="mr-auto">Card Text Display</p>
              <div class="ml-auto w-34">
                <vi-select
                  v-model="listTextShow"
                  class="w-auto"
                >
                  <vi-option
                    v-for="item in listTextShowOptions"
                    :key="item.i"
                    :label="item.name"
                    :value="item.i"
                  >
                  </vi-option>
                </vi-select>
              </div>
            </div>
            <!-- List card text styling. -->
            <div class="flex items-center px-4">
              <p class="mr-auto">Card Text Style</p>
              <div class="ml-auto w-34">
                <vi-select
                  v-model="listTextStyle"
                  class="w-auto"
                >
                  <vi-option
                    v-for="item in listTextStyleOptions"
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
            <!-- Toggle image filtering. -->
            <div class="flex h-10 items-center pl-4 pr-5">
              <p class="mr-auto">Images Filtering</p>
              <vi-switch v-model="imagesFiltering" />
            </div>
            <!-- List images display mode. -->
            <div class="flex items-center px-4">
              <p class="mr-auto">Images Display</p>
              <div class="ml-auto w-34">
                <vi-select
                  v-model="listImages"
                  class="w-auto"
                >
                  <vi-option
                    v-for="item in listImagesOptions"
                    :key="item.i"
                    :label="item.name"
                    :value="item.i"
                  >
                  </vi-option>
                </vi-select>
              </div>
            </div>
            <!-- List display mode. -->
            <div
              v-if="!listPlatform"
              class="flex items-center px-4"
            >
              <p class="mr-auto">Display Mode</p>
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
              <p class="mr-auto">Grid Columns</p>
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
            <!-- Select rows height for the grid display mode. -->
            <div class="flex items-center pl-4 pr-6">
              <p class="mr-auto">Grid Row Height</p>
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
import { listImagesOptions, listTextShowOptions, listTextStyleOptions, cornersOptions, listDisplayOptions, gameCategoryOptions, selectCardCorners } from '@/settings'

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
    const listSpacing = computed({
      get() { return store.getters.getSettingsListsListSpacing },
      set(value) { store.commit('setSettingsListsListSpacing', value) }
    })
    const listScaling = computed({
      get() { return store.getters.getSettingsListsListScaling },
      set(value) { store.commit('setSettingsListsListScaling', value) }
    })
    const listDisplay = computed({
      get() { return store.getters.getSettingsListsListDisplay },
      set(value) { store.commit('setSettingsListsListDisplay', value) }
    })
    const listCorners = computed({
      get() { return store.getters.getSettingsListsListCorners },
      set(value) {
        store.commit('setSettingsListsListCorners', value)
        selectCardCorners(listCorners.value)
      }
    })
    const listTextShow = computed({
      get() { return store.getters.getSettingsListsListTextShow },
      set(value) { store.commit('setSettingsListsListTextShow', value) }
    })
    const listTextStyle = computed({
      get() { return store.getters.getSettingsListsListTextStyle },
      set(value) { store.commit('setSettingsListsListTextStyle', value) }
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
    const listImages = computed({
      get() {
        return props.listPlatform
          ? settingsOver.value
            ? store.getters.getSettingsPlatformOverListImages
            : store.getters.getSettingsPlatformListImages
          : store.getters.getSettingsPlatformListImages
      },
      set(value) {
        store.commit(props.listPlatform
          ? settingsOver.value
            ? 'setSettingsPlatformOverListImages'
            : 'setSettingsPlatformListImages'
          : 'setSettingsPlatformListImages', value)
      }
    })
    const listColumns = computed({
      get() {
        return props.listPlatform
          ? settingsOver.value
            ? store.getters.getSettingsPlatformOverListColumns
            : store.getters.getSettingsPlatformListColumns
          : store.getters.getSettingsPlatformListColumns
      },
      set(value) {
        store.commit(props.listPlatform
          ? settingsOver.value
            ? 'setSettingsPlatformOverListColumns'
            : 'setSettingsPlatformListColumns'
          : 'setSettingsPlatformListColumns', value)
      }
    })
    const listHeight = computed({
      get() {
        return props.listPlatform
          ? settingsOver.value
            ? store.getters.getSettingsPlatformOverListHeight
            : store.getters.getSettingsPlatformListHeight
          : store.getters.getSettingsPlatformListHeight
      },
      set(value) {
        store.commit(props.listPlatform
          ? settingsOver.value
            ? 'setSettingsPlatformOverListHeight'
            : 'setSettingsPlatformListHeight'
          : 'setSettingsPlatformListHeight', value)
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
      listSpacing.value = true
      listScaling.value = true
      listCorners.value = 2
    }
    const presetBlock = () => {
      listSpacing.value = false
      listScaling.value = false
      listCorners.value = 0
    }

    return {
      cornersOptions,
      gameCategoryOptions,
      imagesFiltering,
      listColumns,
      listCorners,
      listDisplay,
      listDisplayOptions,
      listHeight,
      listImages,
      listImagesOptions,
      listScaling,
      listSpacing,
      listTextShow,
      listTextShowOptions,
      listTextStyle,
      listTextStyleOptions,
      presetBlock,
      presetRound,
      selectCategoryGames,
      selectCategoryPlatforms,
      selectCategoryDevelopers,
      settingsOver
    }
  }
}
</script>

<style>
</style>