<template>
  <!-- Game card. -->
  <hip-card>
    <!-- Game card image. -->
    <div v-if="$store.state.cardImageDisplay">
      <img
        v-if="gameImage"
        :src="'file://' + gameImage"
        class="image-content"
        :class="$store.state.cardImagePosition == 1 ? 'w-full' : ''"
      >
      <div
        v-else
        class="border-2 border-theme-200 dark:border-theme-900 image-content items-center"
        :class="$store.state.cardImagePosition == 1 ? 'rounded-xl w-full' : ''"
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
      class="flex h-16 z-0"
      :class="$store.state.cardImageDisplay ? $store.state.cardImagePosition == 0 ? 'ml-24' : '' : ''"
    >
      <div
        class="flex flex-col my-auto"
        :class="[$store.state.cardTextDisplay ? 'visible' : 'invisible',
        !$store.state.darkMode && $store.state.cardImageDisplay && $store.state.cardImagePosition == 1 ? 'text-light text-shadow' : '']"
      >
        <div
          class="inline-flex mb-2"
          :class="$store.state.cardTextPosition == 0 ? 'justify-center' : ''"
        >
          <h1 class="data-title">{{ gameInfo.gameRegions[0].title }}</h1>
          <div
            v-if="gameInfo.gameRegions[0].subTitle"
            class="flex"
          >
            <h2 class="text-xl mx-2 my-auto">-</h2>
            <h2 class="data-content">{{ gameInfo.gameRegions[0].subTitle }}</h2>
          </div>
        </div>
        <div
          class="inline-flex"
          :class="$store.state.cardTextPosition == 0 ? 'justify-center' : ''"
        >
          <div
            v-if="gameInfo.gameRegions[0].originalTitle"
            class="flex"
          >
            <h4 class="data-content">{{ gameInfo.gameRegions[0].originalTitle }}</h4>
            <p class="text-xl mx-2 my-auto">-</p>
          </div>
          <div v-if="gameInfo.platform.parent && $store.state.groupsView">
            <h4 class="data-content">
              {{ parentName }} ({{ gameInfo.platform.name }})
            </h4>
          </div>
          <div v-else>
            <h4 class="data-content">{{ gameInfo.platform.name }}</h4>
          </div>
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