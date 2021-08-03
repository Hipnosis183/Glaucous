<template>
  <p class="text-xl">Text display</p>
  <el-switch
    v-model="cardTextDisplay"
    active-color="var(--color-color-500)"
  ></el-switch>
</template>

<script>
export default {
  name: 'SettingsCardsTextDisplay',
  computed: {
    cardTextDisplay: {
      get() { return this.$store.state.cardTextDisplay },
      set() { this.$store.commit('toggleCardTextDisplay') }
    }
  }
}
</script>

<style>
</style>