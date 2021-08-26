<template>
  <!-- View game details dialog. -->
  <hip-dialog
    v-show="dialog.viewGameDetails"
    @close="viewGameDetails()"
    class="pos-initial z-10"
  >
    <!-- Insert view game details component. -->
    <view-game-details
      :gameInfo="gameInfo"
      :regionIndex="regionIndex"
      :regionName="regionName"
    />
  </hip-dialog>
  <!-- Insert view game linking component. -->
  <view-game-linking
    v-show="dialog.viewGameLinking"
    :gameInfo="gameInfo"
    :regionIndex="regionIndex"
    @close="viewGameLinking()"
    class="pos-initial z-10"
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
    <hip-button @click="viewGameDetails()">Details</hip-button>
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
      <p @click="$router.push({ name: 'ViewDeveloper', params: { id: gameInfo.developer._id } })">
        {{ gameInfo.developer.name }}
      </p>
    </div>
    <div class="data-content">
      <p class="font-semibold">Platform:</p>
      <!-- Go to the platform page. -->
      <div @click="$router.push({ name: 'ViewPlatform', params: { id: gameInfo.platform._id } })">
        <p v-if="gameInfo.platform.parent && $store.getters.getSettingsGamesGroupsView">
          {{ gameInfo.platform.parent.name }} ({{ gameInfo.platform.name }})
        </p>
        <p v-else>
          {{ gameInfo.platform.name }}
        </p>
      </div>
      <!-- Open view game linking dialog. -->
      <hip-button @click="viewGameLinking()">Also On</hip-button>
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
// Import form components.
import ViewGameDetails from './ViewGameDetails.vue'
import ViewGameLinking from './ViewGameLinking.vue'
// Import UI components.
import {
  HipButton,
  HipDialog
} from '../../Component'

export default {
  name: 'ViewGame',
  components: {
    // Form components.
    ViewGameDetails,
    ViewGameLinking,
    // UI components.
    HipButton,
    HipDialog
  },
  data() {
    return {
      dialog: {
        viewGameDetails: false,
        viewGameLinking: false
      }
    }
  },
  props: [
    'fullTitle',
    'gameInfo',
    'regionIndex',
    'regionName'
  ],
  methods: {
    // View details.
    viewGameDetails() {
      // Open details dialog.
      this.dialog.viewGameDetails = !this.dialog.viewGameDetails
    },
    // View and manage linked games.
    viewGameLinking() {
      // Open game linking dialog.
      this.dialog.viewGameLinking = !this.dialog.viewGameLinking
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