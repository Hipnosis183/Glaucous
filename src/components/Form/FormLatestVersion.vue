<template>
  <el-form-item
    label="Latest Version"
    prop="latestVersion"
  >
    <el-input v-model="latestVersion"></el-input>
  </el-form-item>
</template>

<script>
export default {
  name: 'FormLatestVersion',
  computed: {
    latestVersion: {
      get() { return this.$store.state.gameForm.gamePlatform.latestVersion },
      set(value) { this.$store.commit('setGamePlatformLatestVersion', value) }
    }
  }
}
</script>

<style>
</style>