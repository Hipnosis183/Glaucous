<template>
  <el-form-item
    label="Romanized Title"
    prop="romanizedTitle"
  >
    <el-input v-model="romanizedTitle"></el-input>
  </el-form-item>
</template>

<script>
export default {
  name: 'form-romanized-title',
  computed: {
    romanizedTitle: {
      get() { return this.$store.state.gameForm.gameRegion.romanizedTitle },
      set(value) { this.$store.commit('setGameRegionRomanizedTitle', value) }
    }
  }
}
</script>

<style>
.el-form-item {
  margin-bottom: 4px;
}
</style>
