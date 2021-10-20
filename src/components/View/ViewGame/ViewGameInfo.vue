<template>
  <div class="flex">
    <div class="mr-auto">
      <p
        v-show="gameInfo.gameRegions[regionIndex].preTitle"
        class="mb-1 ml-1 text-xl"
      >{{ gameInfo.gameRegions[regionIndex].preTitle }}</p>
      <p class="text-6xl">{{ gameInfo.gameRegions[regionIndex].title }}</p>
      <p
        v-show="gameInfo.gameRegions[regionIndex].subTitle"
        class="ml-1 mt-2 text-4xl"
      >{{ gameInfo.gameRegions[regionIndex].subTitle }}</p>
      <p
        v-show="gameInfo.gameRegions[regionIndex].originalTitle"
        class="ml-1 mt-6 text-3xl"
      >{{ gameInfo.gameRegions[regionIndex].originalTitle }}</p>
    </div>
    <div
      class="ml-auto -mr-4 text-2xl text-right whitespace-nowrap"
      :class="{ 'mt-12' : gameInfo.gameRegions[regionIndex].preTitle }"
    >
      <div class="data-button space-y-1">
        <!-- Go to the platform page. -->
        <div @click="$router.push({ name: 'Platform', params: { id: gameInfo.platform._id } })">
          <p v-if="gameInfo.platform.parent && $store.getters.getSettingsGamesGroupsView">
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViewGameInfo',
  props: {
    gameInfo: { type: Object },
    regionIndex: { type: Number },
    versionIndex: { type: Number }
  }
}
</script>

<style lang="postcss" scoped>
/* Styling. */
.data-button p {
  @apply hover:bg-color-400 dark:hover:bg-color-800 cursor-pointer duration-500 ml-auto p-2 px-3 rounded-list w-min;
}
</style>