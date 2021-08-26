<template>
  <!-- Game card. -->
  <hip-card>
    <!-- Game card image. -->
    <div v-if="$store.getters.getSettingsCardsCardImageDisplay">
      <img
        v-if="gameImage"
        :src="'file://' + gameImage"
        class="image-content"
        :class="$store.getters.getSettingsCardsCardImagePosition == 1 ? 'w-full' : ''"
      >
      <div
        v-else
        class="border-2 border-theme-200 dark:border-theme-900 image-content items-center"
        :class="$store.getters.getSettingsCardsCardImagePosition == 1 ? 'rounded-xl w-full' : ''"
      >
        <div class="flex h-full items-center w-full">
          <div class="el-icon-picture m-auto text-6xl text-theme-300"></div>
        </div>
      </div>
    </div>
    <div
      v-if="$store.getters.getSettingsCardsCardImagePosition == 1 && $store.getters.getSettingsCardsCardImageDisplay && $store.getters.getSettingsCardsCardTextDisplay"
      class="absolute bg-theme-100 dark:bg-theme-900 h-full left-0 opacity-50 rounded-xl top-0 w-full"
    ></div>
    <!-- Game card information. -->
    <div
      class="flex h-16 z-0"
      :class="$store.getters.getSettingsCardsCardImageDisplay ? $store.getters.getSettingsCardsCardImagePosition == 0 ? 'ml-24 mr-4' : '' : ''"
    >
      <div
        class="flex flex-col my-auto"
        :class="[$store.getters.getSettingsCardsCardTextDisplay ? 'visible' : 'invisible',
        !$store.getters.getSettingsThemesDarkMode && $store.getters.getSettingsCardsCardImageDisplay && $store.getters.getSettingsCardsCardImagePosition == 1 ? 'text-light text-shadow' : '']"
      >
        <div
          class="mb-2"
          :class="$store.getters.getSettingsCardsCardTextPosition == 0 ? 'justify-center' : ''"
        >
          <h1 class="data-title">{{ fullTitle }}</h1>
        </div>
        <div
          class="inline-flex"
          :class="$store.getters.getSettingsCardsCardTextPosition == 0 ? 'justify-center' : ''"
        >
          <div
            v-if="gameInfo.gameRegions[0].originalTitle"
            class="flex"
          >
            <h4 class="data-content">{{ gameInfo.gameRegions[0].originalTitle }}</h4>
            <p class="text-xl mx-2 my-auto">-</p>
          </div>
          <h4
            v-if="gameInfo.platform.parent && $store.getters.getSettingsGamesGroupsView"
            class="data-content"
          >{{ parentName }} ({{ gameInfo.platform.name }})</h4>
          <h4
            v-else
            class="data-content"
          >{{ gameInfo.platform.name }}</h4>
          <p class="text-xl mx-2 my-auto">-</p>
          <h4 class="data-content">{{ gameInfo.releaseYear }}</h4>
        </div>
      </div>
    </div>
  </hip-card>
</template>

<script>
import HipCard from './HipCard.vue'
import { getPlatform } from '../../database/controllers/Platform'

export default {
  name: 'HipCardCompact',
  components: {
    HipCard
  },
  data() {
    return {
      parentName: null
    }
  },
  props: [
    'gameImage',
    'gameInfo'
  ],
  mounted() {
    // Check if the platform has a parent group.
    if (this.gameInfo.platform.parent) {
      // Get parent platform name.
      getPlatform(this.gameInfo.platform.parent)
        .then(res => this.parentName = res.name)
    }
  },
  computed: {
    fullTitle() {
      let fullTitle = this.gameInfo.gameRegions[0].title
      if (this.gameInfo.gameRegions[0].subTitle) {
        fullTitle = fullTitle + ' ' + this.gameInfo.gameRegions[0].subTitle
      }
      if (this.gameInfo.gameRegions[0].preTitle) {
        fullTitle = this.gameInfo.gameRegions[0].preTitle + ' ' + fullTitle
      }
      return fullTitle
    }
  }
}
</script>

<style lang="postcss" scoped>
/* Styling. */
.ar-square {
  aspect-ratio: 1 / 1;
}
.data-title {
  @apply font-semibold text-xl;
}
.data-content {
  @apply font-normal my-auto text-base;
}
.image-content {
  @apply absolute ar-square cursor-pointer h-full left-0 object-cover rounded-l-xl top-0;
}
</style>