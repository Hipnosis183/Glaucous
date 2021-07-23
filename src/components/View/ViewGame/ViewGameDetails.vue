<template>
  <!-- Game details. -->
  <div class="flex mb-6">
    <h1 class="data-title">ROM Information</h1>
  </div>
  <div class="flex mb-8 space-x-6">
    <div>
      <div class="data-content">
        <p class="font-semibold">Region:</p>
        <p>{{ regionName }}</p>
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
        <p v-if="!gameInfo.gameRegions[regionIndex].gameVersions[0].currentVersion">-</p>
        <p v-else>{{ gameInfo.gameRegions[regionIndex].gameVersions[0].currentVersion }}</p>
        <p v-if="gameInfo.latestVersion">({{ gameInfo.latestVersion }})</p>
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
  <!-- Comments list. -->
  <div class="flex mb-6">
    <h1 class="data-title">Comments</h1>
  </div>
  <div class="mt-1 text-lg">
    <ul class="list-disc list-inside">
      <div v-if="gameInfo.gameRegions[regionIndex].gameVersions[0].comments.length > 0">
        <li
          v-for="comment in gameInfo.gameRegions[regionIndex].gameVersions[0].comments"
          :key="comment"
          :value="comment"
          class="text-justify"
        >{{ comment }}</li>
      </div>
      <div v-else>
        <li>None</li>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ViewGameDetails',
  props: [
    'gameInfo',
    'regionIndex',
    'regionName'
  ]
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