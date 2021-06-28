<template>
  <div>
    <div class="inline-flex shadow bg-white w-full justify-between">
      <router-link :to="{ name: 'CreateGamePlatform' }">
        <button class="bg-gray-300 font-semibold px-6 py-4 text-base text-blue-800">New Game</button>
      </router-link>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'list-games',
  data() {
    return {
      games: null
    }
  }
}
</script>

<style>
</style>
