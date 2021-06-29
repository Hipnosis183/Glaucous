<template>
  <div>
    <label class="text-blue-900 ml-2">Title</label>
    <input
      type="text"
      class="mt-1 mb-2 px-4 block w-full rounded-full bg-gray-300 border-transparent focus:border-indigo-600 focus:ring-0"
      v-model="title"
    >
    <label class="text-blue-900 ml-2">Subtitle</label>
    <input
      type="text"
      class="mt-1 mb-2 px-4 block w-full rounded-full bg-gray-300 border-transparent focus:border-indigo-600 focus:ring-0"
      v-model="subTitle"
    >
    <label class="text-blue-900 ml-2">Original Title</label>
    <input
      type="text"
      class="mt-1 mb-2 px-4 block w-full rounded-full bg-gray-300 border-transparent focus:border-indigo-600 focus:ring-0"
      v-model="originalTitle"
    >
    <label class="text-blue-900 ml-2">Romanized Title</label>
    <input
      type="text"
      class="mt-1 mb-2 px-4 block w-full rounded-full bg-gray-300 border-transparent focus:border-indigo-600 focus:ring-0"
      v-model="romanizedTitle"
    >
    <label class="text-blue-900 ml-2">Translated Title</label>
    <input
      type="text"
      class="mt-1 mb-2 px-4 block w-full rounded-full bg-gray-300 border-transparent focus:border-indigo-600 focus:ring-0"
      v-model="translatedTitle"
    >
    <label class="text-blue-900 ml-2">Region</label>
    <input
      type="text"
      class="mt-1 mb-2 px-4 block w-full rounded-full bg-gray-300 border-transparent focus:border-indigo-600 focus:ring-0"
      v-model="region"
    >
  </div>
</template>

<script>
export default {
  name: 'create-game-region-c',
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
