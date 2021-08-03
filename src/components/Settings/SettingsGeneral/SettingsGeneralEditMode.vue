<template>
  <p class="text-xl">Edit mode</p>
  <el-switch
    v-model="editMode"
    active-color="var(--color-color-500)"
  ></el-switch>
</template>

<script>
export default {
  name: 'SettingsGeneralEditMode',
  computed: {
    editMode: {
      get() { return this.$store.state.editMode },
      set() { this.$store.commit('toggleEditMode') }
    }
  }
}
</script>

<style>
</style>