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
    <br />
    <el-select
      v-model="region"
      filterable
    >
      <el-option-group
        v-for="flags in regions"
        :key="flags.group"
        :label="flags.group"
      >
        <el-option
          v-for="flag in flags.items"
          :key="flag.code"
          :label="flag.name"
          :value="flag.code"
        >
          <div class="inline-flex space-x-4">
            <img class="w-8" :src="'./images/flags/' + flag.code + '.svg'"/>
            <p>{{ flag.name }}</p>
          </div>
        </el-option>
      </el-option-group>
    </el-select>
  </div>
</template>

<script>
import Regions from '../../../../public/files/flags-g.json'

export default {
  name: 'create-game-region-c',
  data() {
    return {
      regions: Regions
    }
  },
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
