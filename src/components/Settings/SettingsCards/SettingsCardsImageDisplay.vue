<template>
  <p class="text-xl">Image display</p>
  <el-switch
    v-model="cardImageDisplay"
    active-color="var(--color-color-500)"
  ></el-switch>
</template>

<script>
export default {
  name: 'SettingsCardsImageDisplay',
  computed: {
    cardImageDisplay: {
      get() { return this.$store.state.cardImageDisplay },
      set() { this.$store.commit('toggleCardImageDisplay') }
    }
  }
}
</script>

<style>
</style>