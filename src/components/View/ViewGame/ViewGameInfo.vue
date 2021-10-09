<template>
  <!-- View game details dialog. -->
  <view-game-details
    v-show="gameDetailsDialog"
    :gameInfo="gameInfo"
    :regionIndex="regionIndex"
    :versionIndex="versionIndex"
    @close="gameDetailsShow()"
  />
  <!-- Insert view game linking component. -->
  <view-game-linking
    v-show="gameLinkingDialog"
    :gameInfo="gameInfo"
    :regionIndex="regionIndex"
    @close="gameLinkingShow()"
  />
  <!-- Flag image. -->
  <img
    :src="'./images/flags/' + gameInfo.gameRegions[regionIndex].region + '.svg'"
    class="border-2 border-theme-200 dark:border-theme-800 float-right h-10 rounded-md"
  />
  <!-- Header title. -->
  <div class="mb-8">
    <p
      v-show="gameInfo.gameRegions[regionIndex].preTitle"
      class="text-lg"
    >{{ gameInfo.gameRegions[regionIndex].preTitle }}</p>
    <p class="text-4xl">{{ gameInfo.gameRegions[regionIndex].title }}</p>
    <p
      v-show="gameInfo.gameRegions[regionIndex].subTitle"
      class="text-2xl"
    >{{ gameInfo.gameRegions[regionIndex].subTitle }}</p>
    <p
      v-show="gameInfo.gameRegions[regionIndex].originalTitle"
      class="mt-2 text-xl"
    >{{ gameInfo.gameRegions[regionIndex].originalTitle }}</p>
  </div>
  <!-- Body contents. -->
  <div class="flex items-center mb-6 space-x-4">
    <h1 class="data-title">Game Information</h1>
    <!-- Open view game details dialog. -->
    <vi-button
      color
      @click="gameDetailsShow()"
    >Details</vi-button>
  </div>
  <div class="mb-6">
    <div class="data-content">
      <p class="font-semibold">Full Title:</p>
      <p>{{ fullTitle }}</p>
    </div>
    <div
      v-show="gameInfo.gameRegions[regionIndex].originalTitle"
      class="data-content"
    >
      <p class="font-semibold">Original Title:</p>
      <p>{{ gameInfo.gameRegions[regionIndex].originalTitle }}</p>
    </div>
    <div
      v-show="gameInfo.gameRegions[regionIndex].romanizedTitle"
      class="data-content"
    >
      <p class="font-semibold">Romanized Title:</p>
      <p>{{ gameInfo.gameRegions[regionIndex].romanizedTitle }}</p>
    </div>
    <div
      v-show="gameInfo.gameRegions[regionIndex].translatedTitle"
      class="data-content"
    >
      <p class="font-semibold">Translated Title:</p>
      <p>{{ gameInfo.gameRegions[regionIndex].translatedTitle }}</p>
    </div>
  </div>
  <div>
    <div class="data-content">
      <p class="font-semibold">Developer:</p>
      <!-- Go to the developer page. -->
      <p @click="$router.push({ name: 'Developer', params: { id: gameInfo.developer._id } })">
        {{ gameInfo.developer.name }}
      </p>
    </div>
    <div class="data-content">
      <p class="font-semibold">Platform:</p>
      <!-- Go to the platform page. -->
      <div @click="$router.push({ name: 'Platform', params: { id: gameInfo.platform._id } })">
        <p v-if="gameInfo.platform.parent && $store.getters.getSettingsGamesGroupsView">
          {{ gameInfo.platform.parent.name }} ({{ gameInfo.platform.name }})
        </p>
        <p v-else>
          {{ gameInfo.platform.name }}
        </p>
      </div>
      <!-- Open view game linking dialog. -->
      <vi-button
        color
        @click="gameLinkingShow()"
      >Also On</vi-button>
    </div>
    <div class="data-content">
      <p class="font-semibold">Release Year:</p>
      <p>{{ gameInfo.releaseYear }}</p>
    </div>
    <div
      v-show="gameInfo.numberPlayers"
      class="data-content"
    >
      <p class="font-semibold">Number of Players:</p>
      <p>{{ gameInfo.numberPlayers }}</p>
    </div>
  </div>
</template>

<script>
// Import Vue functions.
import { ref } from 'vue'
// Import form components.
import ViewGameDetails from './ViewGameDetails.vue'
import ViewGameLinking from './ViewGameLinking.vue'

export default {
  name: 'ViewGameInfo',
  components: {
    ViewGameDetails,
    ViewGameLinking
  },
  props: {
    fullTitle: { type: String },
    gameInfo: { type: Object },
    regionIndex: { type: Number },
    versionIndex: { type: Number }
  },
  setup() {
    // Manage details display.
    let gameDetailsDialog = ref(false)
    const gameDetailsShow = () => {
      // Toggle details dialog.
      gameDetailsDialog.value = !gameDetailsDialog.value
    }

    // Manage linked games.
    let gameLinkingDialog = ref(false)
    const gameLinkingShow = () => {
      // Toggle game linking dialog.
      gameLinkingDialog.value = !gameLinkingDialog.value
    }

    return {
      gameDetailsDialog,
      gameDetailsShow,
      gameLinkingDialog,
      gameLinkingShow
    }
  }
}
</script>

<style lang="postcss" scoped>
/* Styling. */
.data-content {
  @apply flex items-center mt-1 space-x-2 text-lg;
}
.data-title {
  @apply font-bold text-xl;
}
</style>