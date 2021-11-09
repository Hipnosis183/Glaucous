<template>
  <!-- Open view game details dialog. -->
  <vi-button-ui
    button-small="icon-info"
    @click="gameDetailsShow()"
  />
  <!-- View game details dialog. -->
  <vi-dialog
    v-show="gameDetailsDialog"
    @close="gameDetailsShow()"
    class="left-13 top-0 z-10"
  >
    <!-- Game details. -->
    <div class="flex mb-6">
      <h1 class="data-title">Game Information</h1>
    </div>
    <div class="flex flex-col mb-8">
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
    <div class="flex mb-6">
      <h1 class="data-title">ROM Information</h1>
    </div>
    <div class="flex mb-8 space-x-6">
      <div>
        <div class="data-content">
          <p class="font-semibold">Region:</p>
          <p>{{ gameInfo.gameRegions[regionIndex].regionName }}</p>
        </div>
        <div class="data-content">
          <p class="font-semibold">Format:</p>
          <!-- Placeholder. -->
          <p>-</p>
        </div>
        <div class="data-content">
          <p class="font-semibold">File Size:</p>
          <!-- Placeholder. -->
          <p>-</p>
        </div>
      </div>
      <div>
        <div class="data-content">
          <p class="font-semibold">Version:</p>
          <p v-if="!gameInfo.gameRegions[regionIndex].gameVersions[versionIndex].name && !gameInfo.gameRegions[regionIndex].gameVersions[versionIndex].number">-</p>
          <div
            v-else
            class="flex space-x-1"
          >
            <p v-if="gameInfo.gameRegions[regionIndex].gameVersions[versionIndex].name">
              {{ gameInfo.gameRegions[regionIndex].gameVersions[versionIndex].name }}
            </p>
            <p v-if="gameInfo.gameRegions[regionIndex].gameVersions[versionIndex].number">
              ({{ gameInfo.gameRegions[regionIndex].gameVersions[versionIndex].number }})
            </p>
            <p v-if="gameInfo.gameRegions[regionIndex].gameVersions[versionIndex].type">
              ({{ typeOptions[typeOptions.findIndex((res) => res.i == gameInfo.gameRegions[regionIndex].gameVersions[versionIndex].type)].name }})
            </p>
          </div>
        </div>
        <div class="data-content">
          <p class="font-semibold">Serial | Game ID:</p>
          <p v-if="!gameInfo.gameRegions[regionIndex].serial">-</p>
          <p v-else>{{ gameInfo.gameRegions[regionIndex].serial }}</p>
        </div>
        <div class="data-content">
          <p class="font-semibold">Database ID:</p>
          <p>{{ gameInfo.gameRegions[regionIndex]._id }}</p>
        </div>
      </div>
    </div>
    <!-- Notes list. -->
    <div class="flex mb-6">
      <h1 class="data-title">Notes</h1>
    </div>
    <div class="mt-1 text-lg">
      <ul class="list-disc list-inside text-theme-800 dark:text-theme-100">
        <div v-if="getNotes().length > 0">
          <li
            v-for="note in getNotes()"
            :key="note"
            :value="note"
            class="text-justify"
          >{{ note }}</li>
        </div>
        <div v-else>
          <li>None</li>
        </div>
      </ul>
    </div>
  </vi-dialog>
</template>

<script>
// Import Vue functions.
import { ref } from 'vue'

export default {
  name: 'ViewGameDetails',
  props: {
    fullTitle: { type: String },
    gameInfo: { type: Object },
    regionIndex: { type: Number },
    versionIndex: { type: Number }
  },
  setup(props) {
    // Manage details information.
    const typeOptions = [
      { i: 'patch', name: 'Patch' },
      { i: 'romhack', name: 'ROM Hack' },
      { i: 'translation', name: 'Translation' }
    ]

    // Manage game notes.
    const getNotes = () => {
      return props.gameInfo.notes.concat(props.gameInfo.gameRegions[props.regionIndex].notes, props.gameInfo.gameRegions[props.regionIndex].gameVersions[props.versionIndex].notes)
    }

    // Manage details display.
    let gameDetailsDialog = ref(false)
    const gameDetailsShow = () => {
      // Toggle details dialog.
      gameDetailsDialog.value = !gameDetailsDialog.value
    }

    return {
      gameDetailsDialog,
      gameDetailsShow,
      getNotes,
      typeOptions
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