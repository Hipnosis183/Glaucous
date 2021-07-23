<template>
  <el-form-item
    label="Serial | Code | Game ID"
    prop="serial"
  >
    <el-input v-model="serial"></el-input>
  </el-form-item>
</template>

<script>
export default {
  name: 'FormSerial',
  computed: {
    serial: {
      get() { return this.$store.state.gameForm.gameRegion.serial },
      set(value) { this.$store.commit('setGameRegionSerial', value) }
    }
  }
}
</script>

<style>
</style>