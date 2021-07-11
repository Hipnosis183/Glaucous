<template>
  <el-form-item
    label="Platform"
    prop="platform"
  >
    <el-select
      v-model="platform"
      class="w-full"
      filterable
      placeholder="Required"
    >
      <el-option
        v-for="p in platforms"
        :key="p._id"
        :label="p.name"
        :value="p._id"
      >
      </el-option>
    </el-select>
  </el-form-item>
</template>

<script>
import { getPlatforms } from '../../database/controllers/Platform'

export default {
  name: 'FormPlatform',
  data() {
    return {
      platforms: null
    }
  },
  mounted() {
    // Get platforms.
    getPlatforms()
      .then(res => this.platforms = res)
  },
  computed: {
    platform: {
      get() { return this.$store.state.gameForm.gamePlatform.platform },
      set(value) { this.$store.commit('setGamePlatformPlatform', value) }
    }
  }
}
</script>

<style>
</style>
