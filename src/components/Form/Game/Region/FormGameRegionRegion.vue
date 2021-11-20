<template>
  <!-- Region select. -->
  <vi-select
    v-model="region"
    select-clearable
    select-label="Region"
    select-placeholder="Unknown"
    class="w-full"
  >
    <vi-option-group
      v-for="(flags, index) in regions"
      :key="flags.group"
      :option-label="flags.group"
      :option-last="index == Object.keys(regions).length - 1"
    >
      <vi-option
        v-for="flag in flags.items"
        :key="flag.code"
        :option-label="flag.name"
        :option-value="flag.code"
      >
        <div class="align-middle inline-flex px-2 space-x-4">
          <img
            :src="'./images/flags/' + flag.code + '.svg'"
            class="my-auto w-10"
          />
          <p class="my-auto">{{ flag.name }}</p>
        </div>
      </vi-option>
    </vi-option-group>
  </vi-select>
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