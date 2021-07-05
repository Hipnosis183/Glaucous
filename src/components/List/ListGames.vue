<template>
  <div>
    <hip-nav-bar>
      <router-link :to="{ name: 'CreateGamePlatform' }">
        <hip-button-nb>New Game</hip-button-nb>
      </router-link>
      <div class="w-full"></div>
    </hip-nav-bar>
  </div>
</template>

<script>
import { HipButtonNb, HipCardSq, HipNavBar } from '../Component'

export default {
  name: 'list-games',
  components: {
    HipButtonNb,
    HipCardSq,
    HipNavBar
  },
  data() {
    return {
      games: null
    }
  }
}
</script>

<style>
</style>
