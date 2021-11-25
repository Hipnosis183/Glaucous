<template>
  <div class="space-y-6">
    <vi-section-header section-label="App Settings">
      <!-- Edit mode. -->
      <vi-section-content>
        <p>Edit mode</p>
        <vi-switch v-model="editMode" />
      </vi-section-content>
      <!-- Fullscreen mode. -->
      <vi-section-content>
        <p>Fullscreen mode</p>
        <vi-switch v-model="fullscreenMode" />
      </vi-section-content>
    </vi-section-header>
    <vi-section-header section-label="Other Settings">
      <!-- Game page category. -->
      <vi-section-content>
        <p>Default game page category</p>
        <vi-select
          v-model="gameCategory"
          class="w-max"
        >
          <vi-option
            v-for="item in gameCategoryOptions"
            :key="item.i"
            :option-label="item.name"
            :option-value="item.i"
          />
        </vi-select>
      </vi-section-content>
      <!-- Game full title separator. -->
      <vi-section-content>
        <p>Game full title separator</p>
        <vi-select
          v-model="gameSeparator"
          class="w-max"
        >
          <vi-option
            v-for="item in gameSeparatorOptions"
            :key="item.i"
            :option-label="item.name"
            :option-value="item.i"
          />
        </vi-select>
      </vi-section-content>
      <!-- View platform groups. -->
      <vi-section-content>
        <p>View platform groups</p>
        <vi-switch v-model="groupsView" />
      </vi-section-content>
    </vi-section-header>
  </div>
</template>

<script>
// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'
// Import functions from modules.
import { getCurrentWindow } from '@electron/remote'
// Import settings objects and functions.
import { gameCategoryOptions, gameSeparatorOptions } from '@/settings'

export default {
  name: 'SettingsGeneral',
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage settings in the store.
    const editMode = computed({
      get() { return store.getters.getSettingsGeneralEditMode },
      set() { store.commit('setSettingsGeneralEditMode') }
    })
    const fullscreenMode = computed({
      get() { return store.getters.getSettingsGeneralFullscreenMode },
      set() {
        getCurrentWindow().setFullScreen(!getCurrentWindow().isFullScreen())
        store.commit('setSettingsGeneralFullscreenMode')
      }
    })
    const gameCategory = computed({
      get() { return store.getters.getSettingsGeneralGameCategory },
      set(value) { store.commit('setSettingsGeneralGameCategory', value) }
    })
    const gameSeparator = computed({
      get() { return store.getters.getSettingsGeneralGameSeparator },
      set(value) { store.commit('setSettingsGeneralGameSeparator', value) }
    })
    const groupsView = computed({
      get() { return store.getters.getSettingsGeneralGroupsView },
      set() { store.commit('setSettingsGeneralGroupsView') }
    })

    return {
      editMode,
      fullscreenMode,
      gameCategory,
      gameCategoryOptions,
      gameSeparator,
      gameSeparatorOptions,
      groupsView
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