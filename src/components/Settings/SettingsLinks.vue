<template>
  <div class="space-y-6">
    <!-- Google search. -->
    <vi-section-content>
      <p class="text-xl">Google search icon</p>
      <vi-switch v-model="searchGoogle" />
    </vi-section-content>
    <!-- Google search key. -->
    <vi-section-content>
      <p class="text-xl">Google search key</p>
      <vi-select
        v-model="searchGoogleKey"
        class="w-max"
      >
        <vi-option
          v-for="key in googleKeys"
          :key="key.i"
          :label="key.name"
          :value="key.i"
        />
      </vi-select>
    </vi-section-content>
  </div>
</template>

<script>
// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'
// Import settings objects and functions.
import { googleKeys } from '@/settings'

export default {
  name: 'SettingsLinks',
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage settings in the store.
    const searchGoogle = computed({
      get() { return store.getters.getSettingsLinksSearchGoogle },
      set() { store.commit('setSettingsLinksSearchGoogle') }
    })
    const searchGoogleKey = computed({
      get() { return store.getters.getSettingsLinksSearchGoogleKey },
      set(value) { store.commit('setSettingsLinksSearchGoogleKey', value) }
    })

    return {
      googleKeys,
      searchGoogle,
      searchGoogleKey
    }
  }
}
</script>

<style>
</style>