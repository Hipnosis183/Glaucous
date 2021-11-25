<template>
  <!-- Game card background. -->
  <div
    class="bg-theme-0 dark:bg-theme-900 flex overflow-hidden relative rounded-list shadow-color transform"
    :class="{ 'hover:scale-1005' : $store.getters.getSettingsListsScalingEffect }"
  >
    <!-- Game card overlay. -->
    <div class="absolute border-2 border-transparent hover:border-color-400 dark:hover:border-color-900 cursor-pointer h-full rounded-list w-full z-5" />
    <!-- Game card information. -->
    <div class="m-4 w-full whitespace-nowrap z-0">
      <div class="inline-flex">
        <h1 v-if="gameInfo.gameRegions[0].preTitle">
          {{ gameInfo.gameRegions[0].preTitle }}
        </h1>
        <h1 v-if="gameInfo.gameRegions[0].preTitle">
          {{ gameSeparator.replace(/\s/g, '&nbsp;') }}
        </h1>
        <h1 class="font-medium">
          {{ gameInfo.gameRegions[0].title }}
        </h1>
        <h1 v-if="gameInfo.gameRegions[0].subTitle">
          {{ gameSeparator.replace(/\s/g, '&nbsp;') }}
        </h1>
        <h1 v-if="gameInfo.gameRegions[0].subTitle">
          {{ gameInfo.gameRegions[0].subTitle }}
        </h1>
      </div>
      <div class="ml-auto">
        <h4 v-if="gameInfo.platform.parent && $store.getters.getSettingsGeneralGroupsView">
          {{ parentName }} ({{ gameInfo.platform.name }}) {{ gameInfo.releaseYear ? ' - ' + gameInfo.releaseYear : '' }}
        </h4>
        <h4 v-else>
          {{ gameInfo.platform.name }} {{ gameInfo.releaseYear ? ' - ' + gameInfo.releaseYear : '' }}
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
// Import Vue functions.
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
// Import database controllers functions.
import { getPlatform } from '@/database/controllers/Platform'
// Import settings objects and functions.
import { gameSeparatorOptions } from '@/settings'

export default {
  name: 'ViCardCompact',
  props: {
    gameInfo: { type: Object }
  },
  setup(props) {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage game loading.
    onMounted(() => {
      // Check if the platform has a parent group.
      if (props.gameInfo.platform.parent) {
        // Get parent platform name.
        getPlatform(props.gameInfo.platform.parent)
          .then((res) => {
            gameSeparator.value = gameSeparatorOptions[store.getters.getSettingsGeneralGameSeparator].value
            parentName.value = res.name
          })
      }
    })

    // Get additional game properties.
    let gameSeparator = ref('')
    let parentName = ref(null)

    return {
      gameSeparator,
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