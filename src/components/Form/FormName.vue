<template>
  <el-form-item
    label="Name"
    prop="name"
  >
    <el-input
      v-model="name"
      placeholder="Required"
    ></el-input>
  </el-form-item>
</template>

<script>
export default {
  name: 'FormName',
  computed: {
    name: {
      get() { return this.$store.state.otherForm.name },
      set(value) { this.$store.commit('setOtherName', value) }
    }
  }
}
</script>

<style>
</style>