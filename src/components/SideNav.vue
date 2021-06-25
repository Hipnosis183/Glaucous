<template>
  <div class="w-60 bg-indigo-500 space-y-4 text-center">
    <h1 class="text-gray-200 font-semibold text-3xl my-8">Frontend</h1>
    <router-link to="/games" class="flex">
      <button class="w-10/12 m-auto bg-gray-200 text-blue-800 text-base font-semibold px-6 py-3 rounded-full">Games</button>
    </router-link>
    <router-link to="/developers" class="flex">
      <button class="w-10/12 m-auto bg-gray-200 text-blue-800 text-base font-semibold px-6 py-3 rounded-full">Developers</button>
    </router-link>
    <router-link to="/platforms" class="flex">
      <button class="w-10/12 m-auto bg-gray-200 text-blue-800 text-base font-semibold px-6 py-3 rounded-full">Platforms</button>
    </router-link>
  </div>
</template>

<style>
</style>
