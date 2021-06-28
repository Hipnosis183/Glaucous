<template>
  <div class="flex min-h-screen max-h-screen relative bg-gray-300">
    <side-nav />
    <div class="w-full h-full">
      <router-view />
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
