<template>
  <div>
    <button>
      <router-link
        :to="{ name: 'CreateGamePlatform' }"
      >New Game</router-link>
    </button>
  </div>
</template>

<script>
  export default {
    name: 'list-games',
    data () {
      return {
        games: null
      }
    }
  }
</script>

<style>
</style>
