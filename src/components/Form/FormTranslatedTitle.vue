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
  name: 'FormTranslatedTitle',
  computed: {
    translatedTitle: {
      get() { return this.$store.state.gameForm.gameRegion.translatedTitle },
      set(value) { this.$store.commit('setGameRegionTranslatedTitle', value) }
    }
  }
}
</script>

<style>
</style>
