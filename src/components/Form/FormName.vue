<template>
  <el-form-item
    label="Name"
    prop="name"
  >
    <el-input v-model="name"></el-input>
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
.el-form-item {
  margin-bottom: 4px;
}
</style>
