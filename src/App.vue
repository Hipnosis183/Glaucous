<template>
  <div class="flex min-h-screen max-h-screen relative bg-gray-300">
    <side-nav />
    <div class="flex-1 flex overflow-hidden">
      <div class="flex-1 overflow-y-scroll no-scrollbar">
        <router-view />
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
