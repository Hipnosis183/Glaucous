<template>
  <div>
    <label for="currentVersion">Current Version:</label>
    <input id="currentVersion" v-model="currentVersion">
    <br/>
    <label for="comments">Comments:</label>
    <input id="comments" v-model="comments">
    <br/>
  </div>
</template>

<script>
  export default {
    name: 'create-game-version',
    computed: {
      currentVersion: {
        get() { return this.$store.state.gameForm.gameVersion.currentVersion },
        set(value) { this.$store.commit('setGameVersionCurrentVersion', value) }
      },
      comments: {
        get() { return this.$store.state.gameForm.gameVersion.comments },
        set(value) { this.$store.commit('setGameVersionComments', value) }
      }
    }
  }
</script>

<style>
</style>
