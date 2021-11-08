<template>
  <!-- Game card background. -->
  <div
    class="bg-theme-0 dark:bg-theme-900 flex overflow-hidden relative rounded-list shadow-color transform"
    :class="{ 'hover:scale-1005' : $store.getters.getSettingsListsScalingEffect }"
  >
    <!-- Game card overlay. -->
    <div class="absolute border-2 border-transparent hover:border-color-400 dark:hover:border-color-900 cursor-pointer h-full rounded-list w-full z-5" />
    <!-- Game card image. -->
    <img
      v-if="gameInfo.image.path"
      :src="'file://' + gameInfo.image.path"
      class="image-content rounded-l-list"
    >
    <div
      v-else
      class="bg-theme-200 dark:bg-theme-700 flex h-full image-content rounded-l-list text-theme-0 dark:text-theme-300"
    >
      <vi-icon class="w-16">
        <icon-picture />
      </vi-icon>
    </div>
    <!-- Game card information. -->
    <div class="card-content flex m-4 w-full z-0">
      <div class="space-y-1 text-sm">
        <h2 v-if="gameInfo.gameRegions[0].originalTitle">
          {{ gameInfo.gameRegions[0].originalTitle }}
        </h2>
        <h2 v-else-if="gameInfo.gameRegions[0].preTitle">
          {{ gameInfo.gameRegions[0].preTitle }}
        </h2>
        <h1 class="font-medium text-base">
          {{ gameInfo.gameRegions[0].title }}
        </h1>
        <h2 v-if="gameInfo.gameRegions[0].subTitle">
          {{ gameInfo.gameRegions[0].subTitle }}
        </h2>
      </div>
      <div class="ml-auto space-y-1 text-right">
        <h4 v-if="gameInfo.platform.parent && $store.getters.getSettingsGeneralGroupsView">
          {{ parentName }} ({{ gameInfo.platform.name }})
        </h4>
        <h4 v-else>
          {{ gameInfo.platform.name }}
        </h4>
        <h4>{{ gameInfo.releaseYear }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
// Import Vue functions.
import { onMounted, ref } from 'vue'
// Import database controllers functions.
import { getPlatform } from '@/database/controllers/Platform'

export default {
  name: 'ViCardList',
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

    // Get additional game properties.
    let parentName = ref(null)

    return {
      parentName
    }
  }
}
</script>

<style lang="postcss" scoped>
/* Styling. */
.ar-square {
  aspect-ratio: 1 / 1;
}
.card-content {
  height: 72px;
  margin-left: 120px;
}
.image-content {
  @apply absolute ar-square cursor-pointer h-full left-0 object-cover top-0;
}
/* Transitions. */
div {
  transition: border-color 0.2s;
}
</style>