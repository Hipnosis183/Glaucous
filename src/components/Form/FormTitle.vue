<template>
  <el-form-item
    label="Title"
    prop="title"
  >
    <el-input v-model="title"></el-input>
  </el-form-item>
</template>

<script>
export default {
  name: 'FormTitle',
  computed: {
    title: {
      get() { return this.$store.state.gameForm.gameRegion.title },
      set(value) { this.$store.commit('setGameRegionTitle', value) }
    }
  }
}
</script>

<style>
.el-form-item {
  margin-bottom: 4px;
}
</style>
