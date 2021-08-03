<template>
  <p class="text-xl">Google search icon</p>
  <el-switch
    v-model="searchGoogle"
    active-color="var(--color-color-500)"
  ></el-switch>
</template>

<script>
export default {
  name: 'SettingsLinksGoogleSearch',
  computed: {
    searchGoogle: {
      get() { return this.$store.state.searchGoogle },
      set() { this.$store.commit('toggleSearchGoogle') }
    }
  }
}
</script>

<style>
</style>