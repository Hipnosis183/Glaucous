<template>
  <div class="flex space-x-2">
    <router-link to="/games" class="w-1/3">
      <button class="w-full bg-gray-200 text-blue-800 text-base font-semibold px-6 py-2 rounded-full">Games</button>
    </router-link>
    <router-link to="/developers" class="w-1/3">
      <button class="w-full bg-gray-200 text-blue-800 text-base font-semibold px-6 py-2 rounded-full">Developers</button>
    </router-link>
    <router-link to="/platforms" class="w-1/3">
      <button class="w-full bg-gray-200 text-blue-800 text-base font-semibold px-6 py-2 rounded-full">Platforms</button>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'Index'
  }
</script>

<style>
</style>
