<template>
  <div>
      {{game.title}}
    <button @click="$router.back()">Back</button>
  </div>
</template>

<script>
  export default {
    name: 'view-game',
    data () {
      return {
        game: {
            title: null
        }
      }
    },
    methods: {},
    mounted () {}
  }
</script>

<style>
</style>
