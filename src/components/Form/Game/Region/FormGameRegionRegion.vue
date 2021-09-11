<template>
  <!-- Region select. -->
  <hip-select
    v-model="region"
    label="Region"
    placeholder="Required"
    required
    class="w-full"
  >
    <hip-option-group
      v-for="flags in regions"
      :key="flags.group"
      :label="flags.group"
    >
      <hip-option
        v-for="flag in flags.items"
        :key="flag.code"
        :label="flag.name"
        :value="flag.code"
      >
        <div class="align-middle inline-flex px-2 space-x-4">
          <img
            :src="'./images/flags/' + flag.code + '.svg'"
            class="my-auto w-10"
          />
          <p class="my-auto">{{ flag.name }}</p>
        </div>
      </hip-option>
    </hip-option-group>
  </hip-select>
</template>

<script>
// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'
// Import region data.
import regions from '@/../public/files/flags-g.json'

export default {
  name: 'FormGameRegionRegion',
  setup() {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage forms in the store.
    const region = computed({
      get() { return store.state.gameForm.gameRegion.region },
      set(value) { store.commit('setGameRegionRegion', value) }
    })

    return {
      region,
      regions
    }
  }
}
</script>

<style>
</style>