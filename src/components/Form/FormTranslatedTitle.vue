<template>
  <el-form-item
    label="Translated Title"
    prop="translatedTitle"
  >
    <el-input v-model="translatedTitle"></el-input>
  </el-form-item>
</template>

<script>
export default {
  name: 'form-translated-title',
  computed: {
    translatedTitle: {
      get() { return this.$store.state.gameForm.gameRegion.translatedTitle },
      set(value) { this.$store.commit('setGameRegionTranslatedTitle', value) }
    }
  }
}
</script>

<style>
.el-form-item {
  margin-bottom: 4px;
}
</style>
