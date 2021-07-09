<template>
  <el-form-item
    label="Original Title"
    prop="originalTitle"
  >
    <el-input v-model="originalTitle"></el-input>
  </el-form-item>
</template>

<script>
export default {
  name: 'FormOriginalTitle',
  computed: {
    originalTitle: {
      get() { return this.$store.state.gameForm.gameRegion.originalTitle },
      set(value) { this.$store.commit('setGameRegionOriginalTitle', value) }
    }
  }
}
</script>

<style>
.el-form-item {
  margin-bottom: 4px;
}
</style>
