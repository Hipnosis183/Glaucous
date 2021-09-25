<template>
  <!-- Game card background. -->
  <div
    @mouseenter="gameInfoShow()"
    @mouseleave="gameInfoShow()"
    :style="{ height: $store.getters.getSettingsListsListHeight + 'px' }"
    class="bg-theme-200 dark:bg-theme-700 flex overflow-hidden relative rounded-xl shadow"
  >
    <!-- Game card overlay. -->
    <div class="absolute border-2 border-transparent hover:border-color-400 dark:hover:border-color-900 cursor-pointer h-full rounded-xl w-full z-5" />
    <!-- Game card image. -->
    <img
      v-if="gameInfo.image.path"
      :src="'file://' + gameInfo.image.path"
      class="h-full image-content"
      :class="[
        { 'rendering-pixelated' : gameInfo.config.imageFiltering == false && !gameInfo.image.cover },
        { 'card-blur' : ((gameInfoHover && $store.getters.getSettingsCardsCardTextShow == 0) || $store.getters.getSettingsCardsCardTextShow == 1) && $store.getters.getSettingsCardsCardTextStyle == 3 }
      ]"
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
        v-show="(gameInfoHover && $store.getters.getSettingsCardsCardTextShow == 0) || $store.getters.getSettingsCardsCardTextShow == 1"
        class="flex transition-menu w-full z-0"
      >
        <div
          class="flex flex-col mt-auto p-3 w-full"
          :class="[
            { 'card-solid' : $store.getters.getSettingsCardsCardTextStyle == 0 },
            { 'card-transparent' : $store.getters.getSettingsCardsCardTextStyle == 1 },
            { 'card-gradient h-full' : $store.getters.getSettingsCardsCardTextStyle == 2 },
            { 'card-blurred text-shadow' : $store.getters.getSettingsCardsCardTextStyle == 3 && gameInfo.image.path }
          ]"
        >
          <div class="mb-1 mt-auto text-sm">
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
.card-blur {
  filter: blur(10px);
}
.card-blurred h1 {
  @apply text-color-500;
}
.card-blurred h2 {
  @apply text-color-400;
}
.card-blurred h4 {
  @apply text-theme-200;
}
.card-gradient {
  background-image: linear-gradient(
    rgba(var(--color-theme-100), 0),
    rgba(var(--color-theme-100), 0.1) 10%,
    rgba(var(--color-theme-100), 0.3) 20%,
    rgba(var(--color-theme-100), 0.5) 30%,
    rgba(var(--color-theme-100), 0.7) 45%,
    rgba(var(--color-theme-100), 0.9) 65%,
    rgba(var(--color-theme-100), 1)
  );
}
.dark .card-gradient {
  background-image: linear-gradient(
    rgba(var(--color-theme-900), 0),
    rgba(var(--color-theme-900), 0.1) 10%,
    rgba(var(--color-theme-900), 0.3) 20%,
    rgba(var(--color-theme-900), 0.5) 30%,
    rgba(var(--color-theme-900), 0.7) 45%,
    rgba(var(--color-theme-900), 0.9) 65%,
    rgba(var(--color-theme-900), 1)
  );
}
.card-solid {
  background-color: rgba(var(--color-theme-100), 1);
}
.dark .card-solid {
  background-color: rgba(var(--color-theme-900), 1);
}
.card-transparent {
  background-color: rgba(var(--color-theme-100), 0.8);
}
.dark .card-transparent {
  background-color: rgba(var(--color-theme-900), 0.8);
}
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
img {
  transition: filter 0.2s ease-in-out;
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