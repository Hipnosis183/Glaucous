<template>
  <div class="bg-gray-300 flex max-h-screen min-h-screen relative">
    <side-nav />
    <div class="flex flex-1 overflow-hidden">
      <div class="flex-1 no-scrollbar overflow-y-scroll">
        <router-view :key="$route.fullPath" />
      </div>
    </div>
  </div>
</template>

<script>
import SideNav from './components/SideNav.vue'

export default {
  components: { SideNav }
}
</script>

<style>
</style>