<template>
  <el-form-item
    label="Subtitle"
    prop="subTitle"
  >
    <el-input v-model="subTitle"></el-input>
  </el-form-item>
</template>

<script>
export default {
  name: 'FormSubTitle',
  computed: {
    subTitle: {
      get() { return this.$store.state.gameForm.gameRegion.subTitle },
      set(value) { this.$store.commit('setGameRegionSubTitle', value) }
    }
  }
}
</script>

<style>
.el-form-item {
  margin-bottom: 4px;
}
</style>
