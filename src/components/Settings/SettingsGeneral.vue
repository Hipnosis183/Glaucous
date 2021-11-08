<template>
  <div class="space-y-6">
    <!-- Edit mode. -->
    <vi-section-content>
      <p class="text-xl">Edit mode</p>
      <vi-switch v-model="editMode" />
    </vi-section-content>
    <!-- Game page category. -->
    <vi-section-content>
      <p class="text-xl">Default game page category</p>
      <vi-select
        v-model="gameCategory"
        class="w-max"
      >
        <vi-option
          v-for="item in gameCategoryOptions"
          :key="item.i"
          :label="item.name"
          :value="item.i"
        />
      </vi-select>
    </vi-section-content>
    <!-- View platform groups. -->
    <vi-section-content>
      <p class="text-xl">View platform groups</p>
      <vi-switch v-model="groupsView" />
    </vi-section-content>
  </div>
</template>

<script>
// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'
// Import settings objects and functions.
import { gameCategoryOptions } from '@/settings'

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
    const gameCategory = computed({
      get() { return store.getters.getSettingsGeneralGameCategory },
      set(value) { store.commit('setSettingsGeneralGameCategory', value) }
    })
    const groupsView = computed({
      get() { return store.getters.getSettingsGeneralGroupsView },
      set() { store.commit('setSettingsGeneralGroupsView') }
    })

    return {
      editMode,
      gameCategory,
      gameCategoryOptions,
      groupsView
    }
  }
}
</script>

<style>
</style>