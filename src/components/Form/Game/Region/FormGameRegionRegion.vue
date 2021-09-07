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
// Import region data.
import Regions from '../../../../../public/files/flags-g.json'
// Import UI components.
import {
  HipOption,
  HipOptionGroup,
  HipSelect
} from '../../../Component'

export default {
  name: 'FormGameRegionRegion',
  components: {
    // UI components.
    HipOption,
    HipOptionGroup,
    HipSelect
  },
  data() {
    return {
      regions: Regions
    }
  },
  computed: {
    region: {
      get() { return this.$store.state.gameForm.gameRegion.region },
      set(value) { this.$store.commit('setGameRegionRegion', value) }
    }
  }
}
</script>

<style>
</style>