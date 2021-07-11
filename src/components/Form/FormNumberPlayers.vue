<template>
  <el-form-item
    label="Number of Players"
    prop="numberPlayers"
  >
    <el-input v-model="numberPlayers"></el-input>
  </el-form-item>
</template>

<script>
export default {
  name: 'FormNumberPlayers',
  computed: {
    numberPlayers: {
      get() { return this.$store.state.gameForm.gamePlatform.numberPlayers },
      set(value) { this.$store.commit('setGamePlatformNumberPlayers', value) }
    }
  }
}
</script>

<style>
</style>
