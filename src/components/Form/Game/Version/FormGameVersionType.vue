<template>
  <!-- Version type select. -->
  <vi-select
    v-model="type"
    clearable
    label="Version Type"
    placeholder="Game Version"
    class="w-full"
  >
    <vi-option
      v-for="item in typeOptions"
      :key="item.i"
      :label="item.name"
      :value="item.i"
    />
  </vi-select>
</template>

<script>
// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'FormGameVersionType',
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage forms in the store.
    const type = computed({
      get() { return store.state.gameForm.gameVersion.type },
      set(value) { store.commit('setGameVersionType', value) }
    })
    const typeOptions = [
      { i: 'patch', name: 'Patch' },
      { i: 'romhack', name: 'ROM Hack' },
      { i: 'translation', name: 'Translation' }
    ]

    return {
      type,
      typeOptions
    }
  }
}
</script>

<style>
</style>