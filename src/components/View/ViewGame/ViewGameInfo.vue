<template>
  <div class="flex">
    <div class="flex flex-col mr-auto">
      <p
        v-show="gameInfo.gameRegions[regionIndex].preTitle"
        class="mb-1 ml-1 -mt-3 text-xl"
      >{{ gameInfo.gameRegions[regionIndex].preTitle }}</p>
      <p class="text-5.5xl">{{ gameInfo.gameRegions[regionIndex].title }}</p>
      <p
        v-show="gameInfo.gameRegions[regionIndex].subTitle"
        :class="hideElementsTags && gameInfo.gameRegions[regionIndex].subTitle ? 'ml-1.5 mt-3 text-2.5xl' : 'ml-1 mt-4 text-4xl'"
      >{{ gameInfo.gameRegions[regionIndex].subTitle }}</p>
      <p
        v-show="gameInfo.gameRegions[regionIndex].originalTitle"
        class="ml-1"
        :class="hideElementsTags
          ? gameInfo.gameRegions[regionIndex].subTitle ? 'mt-3 text-2xl' : 'mt-4 text-2.5xl'
          : gameInfo.gameRegions[regionIndex].subTitle ? 'mt-auto text-2.5xl' : 'mt-4 text-2.5xl'"
      >{{ gameInfo.gameRegions[regionIndex].originalTitle }}</p>
      <!-- View game tags. -->
      <view-game-tags
        v-if="hideElementsTags"
        :key="gameInfo"
        :game-info="gameInfo"
      />
    </div>
    <div
      class="-mb-3 ml-auto -mr-4 text-2xl text-right whitespace-nowrap"
      :class="gameInfo.gameRegions[regionIndex].preTitle ? 'mt-6' : 'mt-1'"
    >
      <div class="data-button space-y-1">
        <!-- Go to the platform page. -->
        <div @click="$router.push({ name: 'Platform', params: { id: gameInfo.platform._id } })">
          <p v-if="gameInfo.platform.parent && $store.getters.getSettingsGeneralGroupsView">
            {{ gameInfo.platform.parent.name }} ({{ gameInfo.platform.name }})
          </p>
          <p v-else>
            {{ gameInfo.platform.name }}
          </p>
        </div>
        <!-- Go to the developer page. -->
        <p @click="$router.push({ name: 'Developer', params: { id: gameInfo.developer._id } })">
          {{ gameInfo.developer.name }}
        </p>
      </div>
      <p
        v-show="gameInfo.releaseYear"
        class="mt-1 pt-2 px-3"
      >{{ gameInfo.releaseYear }}</p>
      <div
        v-show="gameInfo.numberPlayers"
        class="flex pt-2"
      >
        <div class="flex ml-auto mr-2 space-x-px">
          <vi-icon
            v-for="index in 4"
            :key="index"
            icon-manual
            class="w-6"
            :class="getNumberPlayers(index) ? 'text-theme-800 dark:text-theme-100' : 'text-theme-500'"
          >
            <icon-games />
          </vi-icon>
        </div>
        <div
          @click="$router.push({ name: 'Players', params: { id: gameInfo.numberPlayers } })"
          class="data-button"
        >
          <p v-if="gameInfo.numberPlayers == '1'">1 Player</p>
          <p v-else-if="gameInfo.numberPlayers == '2'">2 Players</p>
          <p v-else-if="gameInfo.numberPlayers == '3'">3 Players</p>
          <p v-else-if="gameInfo.numberPlayers == '4'">4 Players</p>
          <p v-else>4+ Players</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Import Vue functions.
import { computed } from 'vue'
import { useStore } from 'vuex'
// Import form components.
import ViewGameTags from './ViewGameTags.vue'

export default {
  name: 'ViewGameInfo',
  components: {
    ViewGameTags
  },
  props: {
    gameInfo: { type: Object },
    regionIndex: { type: Number },
    versionIndex: { type: Number }
  },
  setup(props) {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage number of players state.
    const getNumberPlayers = (index) => {
      switch (props.gameInfo.numberPlayers) {
        case '1': {
          switch (index) {
            case 1: { return true }
            default: { return false }
          }
        }
        case '2': {
          switch (index) {
            case 1: case 2: { return true }
            default: { return false }
          }
        }
        case '3': {
          switch (index) {
            case 1: case 2: case 3: { return true }
            default: { return false }
          }
        }
        default: { return true }
      }
    }

    // Manage elements display state.
    const hideElementsTags = computed(() => {
      return !store.getters.getSettingsGameHideElementsTags
    })

    return {
      getNumberPlayers,
      hideElementsTags
    }
  }
}
</script>

<style lang="postcss" scoped>
/* Styling. */
.data-button p {
  @apply hover:bg-color-400 dark:hover:bg-color-800 cursor-pointer duration-500 ml-auto p-2 px-3 w-min;
}
</style>