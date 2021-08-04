<template>
  <!-- Game card. -->
  <hip-card>
    <!-- Game card image. -->
    <div v-if="$store.state.cardImageDisplay">
      <img
        v-if="gameImage"
        :src="'file://' + gameImage"
        class="image-content"
        :class="$store.state.cardImagePosition == 1 ? 'h-full' : 'h-40'"
      >
      <div
        v-else
        class="border-2 border-theme-200 dark:border-theme-900 image-content items-center"
        :class="$store.state.cardImagePosition == 1 ? 'h-full rounded-xl' : 'h-40'"
      >
        <div class="flex h-full items-center w-full">
          <div class="el-icon-picture m-auto text-6xl text-theme-300"></div>
        </div>
      </div>
    </div>
    <div
      v-if="$store.state.cardImagePosition == 1 && $store.state.cardImageDisplay && $store.state.cardTextDisplay"
      class="absolute bg-theme-100 dark:bg-theme-900 h-full left-0 opacity-50 rounded-xl top-0 w-full"
    ></div>
    <!-- Game card information. -->
    <div
      class="flex z-0"
      :class="$store.state.cardImageDisplay ? $store.state.cardImagePosition == 0 ? 'mt-40' : '' : ''"
    >
      <div
        class="my-auto"
        :class="[$store.state.cardTextDisplay ? 'visible' : 'invisible h-40',
        !$store.state.darkMode && $store.state.cardImageDisplay && $store.state.cardImagePosition == 1 ? 'text-light text-shadow' : '']"
      >
        <div class="mb-2">
          <h1 class="data-title">{{ gameInfo.gameRegions[0].title }}</h1>
          <h2 class="data-content">{{ gameInfo.gameRegions[0].subTitle }}</h2>
        </div>
        <div class="mb-2">
          <h4 class="data-content">{{ gameInfo.gameRegions[0].originalTitle }}</h4>
        </div>
        <div class="inline-flex">
          <h4 class="data-content">{{ gameInfo.platform.name }}</h4>
          <p class="text-xl mx-2 my-auto">-</p>
          <h4 class="data-content">{{ gameInfo.releaseYear }}</h4>
        </div>
      </div>
    </div>
  </hip-card>
</template>

<script>
import HipCard from './HipCard.vue'

export default {
  name: 'HipCardTall',
  components: {
    HipCard
  },
  props: [
    'gameImage',
    'gameInfo'
  ]
}
</script>

<style lang="postcss" scoped>
/* Styling. */
.data-title {
  @apply font-semibold text-xl;
}
.data-content {
  @apply font-normal my-auto text-base;
}
.image-content {
  @apply absolute cursor-pointer left-0 object-cover rounded-t-xl top-0 w-full;
}
</style>