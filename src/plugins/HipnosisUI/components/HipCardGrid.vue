<template>
  <!-- Game card background. -->
  <div
    @mouseenter="gameInfoShow()"
    @mouseleave="gameInfoShow()"
    :style="{ height: $store.getters.getSettingsCardsCardHeight + 'px' }"
    class="bg-theme-200 dark:bg-theme-700 flex overflow-hidden relative rounded-xl shadow"
  >
    <!-- Game card overlay. -->
    <div class="absolute border-2 border-transparent hover:border-color-400 dark:hover:border-color-900 cursor-pointer h-full rounded-xl w-full z-5" />
    <!-- Game card image. -->
    <img
      v-if="gameInfo.image.path"
      :src="'file://' + gameInfo.image.path"
      class="h-full image-content"
      :class="{ 'rendering-pixelated' : gameInfo.config.imageFiltering == false && !gameInfo.image.cover }"
    >
    <div
      v-else
      class="flex h-full image-content text-theme-0 dark:text-theme-300 w-full"
    >
      <hip-icon class="w-16">
        <icon-picture />
      </hip-icon>
    </div>
    <!-- Game card information. -->
    <transition name="slide-card">
      <div
        v-show="gameInfoHover"
        class="flex transition-menu w-full z-0"
      >
        <div class="bg-theme-0 dark:bg-theme-900 mt-auto p-3 w-full">
          <div class="mb-1 text-sm">
            <h1 class="font-medium text-base">
              {{ gameInfo.gameRegions[0].title }}
            </h1>
            <h2 v-if="gameInfo.gameRegions[0].subTitle">
              {{ gameInfo.gameRegions[0].subTitle }}
            </h2>
            <h2 v-else>
              {{ gameInfo.gameRegions[0].originalTitle }}
            </h2>
          </div>
          <div class="text-sm whitespace-nowrap">
            <h4 v-if="gameInfo.platform.parent && $store.getters.getSettingsGamesGroupsView">
              {{ parentName }} ({{ gameInfo.platform.name }})
            </h4>
            <h4 v-else>
              {{ gameInfo.platform.name }}
            </h4>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
// Import Vue functions.
import { onMounted, ref } from 'vue'
// Import database controllers functions.
import { getPlatform } from '@/database/controllers/Platform'

export default {
  name: 'HipCardGrid',
  props: {
    gameInfo: { type: Object }
  },
  setup(props) {
    onMounted(() => {
      // Check if the platform has a parent group.
      if (props.gameInfo.platform.parent) {
        // Get parent platform name.
        getPlatform(props.gameInfo.platform.parent)
          .then((res) => parentName.value = res.name)
      }
    })

    // Manage game info display when hovering.
    let gameInfoHover = ref(false)
    const gameInfoShow = () => {
      gameInfoHover.value = !gameInfoHover.value
    }

    // Get additional game properties.
    let parentName = ref(null)

    return {
      gameInfoHover,
      gameInfoShow,
      parentName
    }
  }
}
</script>

<style lang="postcss" scoped>
/* Styling. */
.image-content {
  @apply absolute cursor-pointer left-0 object-cover rounded-xl top-0 w-full;
}
.rendering-pixelated {
  image-rendering: pixelated;
}
/* Transitions. */
div {
  transition: border-color 0.2s;
}
.slide-card-leave-to,
.slide-card-enter-active {
  transform: scaleY(0);
}
.slide-card-enter-from,
.slide-card-leave-to {
  opacity: 0;
}
.transition-menu {
  transform-origin: bottom;
  transition: transform 0.1s ease-in-out, opacity 0.1s ease-in-out;
}
</style>