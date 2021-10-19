<template>
  <!-- Open image settings dialog. -->
  <vi-menu-button
    icon="icon-grid"
    placement="left-start"
  >
    <!-- Image settings. -->
    <div class="text-center w-88">
      <h1 class="font-medium mb-5 -mt-1 text-lg">Image Settings</h1>
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
        <!-- Select number of columns. -->
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
      </div>
    </div>
  </vi-menu-button>
</template>

<script>
// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'
// Import settings objects and functions.
import { cornersRoundingOptions, selectImageCornersRounding, selectImageGridColumns } from '@/settings'

export default {
  name: 'SettingsImages',
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage settings in the store.
    const scalingEffect = computed({
      get() { return store.getters.getSettingsImagesScalingEffect },
      set(value) { store.commit('setSettingsImagesScalingEffect', value) }
    })
    const contentSpacing = computed({
      get() { return store.getters.getSettingsImagesContentSpacing },
      set(value) { store.commit('setSettingsImagesContentSpacing', value) }
    })
    const cornersRounding = computed({
      get() { return store.getters.getSettingsImagesCornersRounding },
      set(value) {
        store.commit('setSettingsImagesCornersRounding', value)
        selectImageCornersRounding(cornersRounding.value)
      }
    })
    const gridColumns = computed({
      get() { return store.getters.getSettingsImagesGridColumns },
      set(value) {
        store.commit('setSettingsImagesGridColumns', value)
        selectImageGridColumns(gridColumns.value)
      }
    })

    return {
      contentSpacing,
      cornersRounding,
      cornersRoundingOptions,
      gridColumns,
      scalingEffect
    }
  }
}
</script>

<style>
</style>