<template>
  <!-- Open image settings dialog. -->
  <vi-menu-button
    icon="icon-menu"
    placement="left-start"
  >
    <!-- Image settings. -->
    <div class="text-center w-64">
      <h1 class="font-medium mb-5 -mt-1 text-lg">Image Settings</h1>
      <div class="space-y-2">
        <!-- Toggle image scaling effect. -->
        <div class="flex h-10 items-center pl-4 pr-5">
          <p class="mr-auto">Scaling</p>
          <vi-switch v-model="imageScaling" />
        </div>
        <!-- Image corner modes. -->
        <div class="flex items-center px-4">
          <p class="mr-auto">Corners</p>
          <div class="ml-auto w-34">
            <vi-select
              v-model="imageCorners"
              class="w-auto"
            >
              <vi-option
                v-for="item in imageCornersOptions"
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
          <p class="mr-auto">Columns</p>
          <div class="ml-auto w-32">
            <vi-input-num
              v-model="imageColumns"
              :min="1"
              :max="20"
              position-side
            >
            </vi-input-num>
          </div>
        </div>
        <!-- Select the gap size between each element of the grid. -->
        <div class="flex items-center pl-4 pr-6">
          <p class="mr-auto">Gap</p>
          <div class="ml-auto w-32">
            <vi-input-num
              v-model="imageGap"
              :min="1"
              :max="100"
              position-side
              :step="10"
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
import { imageCornersOptions, selectImageColumns, selectImageCorners } from '@/settings'

export default {
  name: 'SettingsImages',
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage settings in the store.
    const imageScaling = computed({
      get() { return store.getters.getSettingsImagesImageScaling },
      set(value) { store.commit('setSettingsImagesImageScaling', value) }
    })
    const imageCorners = computed({
      get() { return store.getters.getSettingsImagesImageCorners },
      set(value) {
        store.commit('setSettingsImagesImageCorners', value)
        selectImageCorners(imageCorners.value)
      }
    })
    const imageColumns = computed({
      get() { return store.getters.getSettingsImagesImageColumns },
      set(value) {
        store.commit('setSettingsImagesImageColumns', value)
        selectImageColumns(imageColumns.value)
      }
    })
    const imageGap = computed({
      get() { return store.getters.getSettingsImagesImageGap },
      set(value) { store.commit('setSettingsImagesImageGap', value) }
    })

    return {
      imageColumns,
      imageCorners,
      imageCornersOptions,
      imageGap,
      imageScaling
    }
  }
}
</script>

<style>
</style>