<template>
  <!-- Game details. -->
  <div class="flex mb-6">
    <h1 class="data-title">ROM Information</h1>
  </div>
  <div class="flex space-x-6 mb-8">
    <div>
      <div class="data-container">
        <p class="font-semibold">Region:</p>
        <p>{{ regionName }}</p>
      </div>
      <div class="data-container">
        <p class="font-semibold">Format:</p>
        <!-- Placeholder. -->
        <p>-</p>
      </div>
      <div class="data-container">
        <p class="font-semibold">File Size:</p>
        <!-- Placeholder. -->
        <p>-</p>
      </div>
    </div>
    <div>
      <div class="data-container">
        <p class="font-semibold">Current Version:</p>
        <p>{{ gameInfo.gameRegions[regionIndex].gameVersions[0].currentVersion }}</p>
      </div>
      <div class="data-container">
        <p class="font-semibold">Latest Version:</p>
        <p>{{ gameInfo.latestVersion }}</p>
      </div>
      <div class="data-container">
        <p class="font-semibold">ID:</p>
        <p>{{ gameInfo.gameRegions[regionIndex]._id }}</p>
      </div>
    </div>
  </div>
  <!-- Comments list. -->
  <div class="flex mb-6">
    <h1 class="data-title">Comments</h1>
  </div>
  <div class="text-lg mt-1">
    <ul class="list-disc list-inside">
      <div v-if="gameInfo.gameRegions[regionIndex].gameVersions[0].comments.length > 0">
        <li
          class="text-justify"
          v-for="comment in gameInfo.gameRegions[regionIndex].gameVersions[0].comments"
          :key="comment"
          :value="comment"
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

<style>
</style>
