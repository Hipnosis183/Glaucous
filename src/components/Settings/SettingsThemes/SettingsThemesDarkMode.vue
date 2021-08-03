<template>
  <p class="text-xl">Dark mode</p>
  <el-switch
    v-model="darkMode"
    active-color="var(--color-color-500)"
  ></el-switch>
</template>

<script>
export default {
  name: 'SettingsThemesDarkMode',
  computed: {
    darkMode: {
      get() { return this.$store.state.darkMode },
      set() { this.$store.commit('toggleDarkMode') }
    }
  }
}
</script>

<style>
</style>