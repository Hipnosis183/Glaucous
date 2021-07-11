<template>
  <el-form-item
    label="Current Version"
    prop="currentVersion"
  >
    <el-input v-model="currentVersion"></el-input>
  </el-form-item>
</template>

<script>
export default {
  name: 'FormCurrentVersion',
  computed: {
    currentVersion: {
      get() { return this.$store.state.gameForm.gameVersion.currentVersion },
      set(value) { this.$store.commit('setGameVersionCurrentVersion', value) }
    }
  }
}
</script>

<style>
</style>
