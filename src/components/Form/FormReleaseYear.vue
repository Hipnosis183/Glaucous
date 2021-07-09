<template>
  <el-form-item
    label="Release Year"
    prop="releaseYear"
  >
    <el-input v-model="releaseYear"></el-input>
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
.el-form-item{
  margin-bottom: 4px;
}
</style>
