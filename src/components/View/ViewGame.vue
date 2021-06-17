<template>
  <div>
      {{game.title}}
    <button @click="$router.back()">Back</button>
  </div>
</template>

<script>
  export default {
    name: 'create-game',
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
