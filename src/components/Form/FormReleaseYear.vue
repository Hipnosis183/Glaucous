<template>
  <el-form-item
    label="Release Year"
    prop="releaseYear"
  >
    <el-input
      v-model="releaseYear"
      placeholder="Required"
    ></el-input>
  </el-form-item>
</template>

<script>
export default {
  name: 'FormReleaseYear',
  computed: {
    releaseYear: {
      get() { return this.$store.state.gameForm.gamePlatform.releaseYear },
      set(value) { this.$store.commit('setGamePlatformReleaseYear', value) }
    }
  }
}
</script>

<style>
</style>
