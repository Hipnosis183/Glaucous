<template>
  <div>
    <label class="text-blue-900 ml-2">Current Version</label>
    <input
      type="text"
      class="mt-1 mb-2 px-4 block w-full rounded-full bg-gray-300 border-transparent focus:border-indigo-600 focus:ring-0"
      v-model="currentVersion"
    >
    <label class="text-blue-900 ml-2">Comments</label>
    <input
      type="text"
      class="mt-1 mb-2 px-4 block w-full rounded-full bg-gray-300 border-transparent focus:border-indigo-600 focus:ring-0"
      v-model="comments"
    >
  </div>
</template>

<script>
export default {
  name: 'create-game-version-c',
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
