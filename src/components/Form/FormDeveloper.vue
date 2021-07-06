<template>
  <el-form-item
    label="Developer"
    prop="developer"
  >
    <el-select
      v-model="developer"
      class="w-full"
      filterable
    >
      <el-option
        v-for="d in developers"
        :key="d._id"
        :label="d.name"
        :value="d._id"
      >
      </el-option>
    </el-select>
  </el-form-item>
</template>

<script>
import { getDevelopers } from '../../database/controllers/Developer'

export default {
  name: 'form-developer',
  data() {
    return {
      developers: null
    }
  },
  mounted() {
    // Get developers.
    getDevelopers()
      .then(res => this.developers = res)
  },
  computed: {
    developer: {
      get() { return this.$store.state.gameForm.gamePlatform.developer },
      set(value) { this.$store.commit('setGamePlatformDeveloper', value) }
    }
  }
}
</script>

<style>
.el-form-item{
  margin-bottom: 4px;
}
</style>
