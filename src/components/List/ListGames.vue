<template>
  <div>
    <router-link :to="{ name: 'CreateGamePlatform' }">
      <button class="bg-gray-200 font-semibold px-6 py-3 rounded-full text-base text-blue-800">New Game</button>
    </router-link>
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
