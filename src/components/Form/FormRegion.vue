<template>
  <el-form-item
    label="Region"
    prop="region"
  >
    <el-select
      v-model="region"
      filterable
      placeholder="Required"
      class="w-full"
    >
      <el-option-group
        v-for="flags in regions"
        :key="flags.group"
        :label="flags.group"
      >
        <el-option
          v-for="flag in flags.items"
          :key="flag.code"
          :label="flag.name"
          :value="flag.code"
        >
          <div class="inline-flex space-x-4">
            <img
              :src="'./images/flags/' + flag.code + '.svg'"
              class="w-8"
            />
            <p>{{ flag.name }}</p>
          </div>
        </el-option>
      </el-option-group>
    </el-select>
  </el-form-item>
</template>

<script>
import Regions from '../../../public/files/flags-g.json'

export default {
  name: 'FormRegion',
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