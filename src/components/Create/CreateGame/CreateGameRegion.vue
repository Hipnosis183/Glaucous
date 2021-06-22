<template>
  <div>
    <label for="title">Title:</label>
    <input id="title" v-model="title">
    <br/>
    <label for="subTitle">Subtitle:</label>
    <input id="subTitle" v-model="subTitle">
    <br/>
    <label for="originalTitle">Original Title:</label>
    <input id="originalTitle" v-model="originalTitle">
    <br/>
    <label for="romanizedTitle">Romanized Title:</label>
    <input id="romanizedTitle" v-model="romanizedTitle">
    <br/>
    <label for="translatedTitle">Translated Title:</label>
    <input id="translatedTitle" v-model="translatedTitle">
    <br/>
    <label for="region">Region:</label>
    <input id="region" v-model="region">
    <br/>
  </div>
</template>

<script>
  export default {
    name: 'create-game-region',
    computed: {
      title: {
        get() { return this.$store.state.gameForm.gameRegion.title },
        set(value) { this.$store.commit('setGameRegionTitle', value) }
      },
      subTitle: {
        get() { return this.$store.state.gameForm.gameRegion.subTitle },
        set(value) { this.$store.commit('setGameRegionSubTitle', value) }
      },
      originalTitle: {
        get() { return this.$store.state.gameForm.gameRegion.originalTitle },
        set(value) { this.$store.commit('setGameRegionOriginalTitle', value) }
      },
      romanizedTitle: {
        get() { return this.$store.state.gameForm.gameRegion.romanizedTitle },
        set(value) { this.$store.commit('setGameRegionRomanizedTitle', value) }
      },
      translatedTitle: {
        get() { return this.$store.state.gameForm.gameRegion.translatedTitle },
        set(value) { this.$store.commit('setGameRegionTranslatedTitle', value) }
      },
      region: {
        get() { return this.$store.state.gameForm.gameRegion.region },
        set(value) { this.$store.commit('setGameRegionRegion', value) }
      }
    }
  }
</script>

<style>
</style>
