<template>
  <!-- Game card background. -->
  <div class="bg-theme-0 dark:bg-theme-900 flex overflow-hidden relative rounded-xl shadow-color">
    <!-- Game card overlay. -->
    <div class="absolute border-2 border-transparent hover:border-color-400 dark:hover:border-color-900 cursor-pointer h-full rounded-xl w-full z-5" />
    <!-- Game card information. -->
    <div class="m-4 w-full whitespace-nowrap z-0">
      <div class="inline-flex space-x-2">
        <h1 v-if="gameInfo.gameRegions[0].preTitle">
          {{ gameInfo.gameRegions[0].preTitle }}
        </h1>
        <h1 class="font-medium">
          {{ gameInfo.gameRegions[0].title }}
        </h1>
        <h1 v-if="gameInfo.gameRegions[0].subTitle">
          {{ gameInfo.gameRegions[0].subTitle }}
        </h1>
      </div>
      <div class="ml-auto">
        <h4 v-if="gameInfo.platform.parent && $store.getters.getSettingsGamesGroupsView">
          {{ parentName }} ({{ gameInfo.platform.name }}) - {{ gameInfo.releaseYear }}
        </h4>
        <h4 v-else>
          {{ gameInfo.platform.name }} - {{ gameInfo.releaseYear }}
        </h4>
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
  name: 'HipCardCompact',
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
/* Transitions. */
div {
  transition: border-color 0.2s;
}
</style>