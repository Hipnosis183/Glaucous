<template>
  <div class="flex min-h-screen relative">
    <side-nav/>
    <div class="p-6 w-full">
      <router-view/>
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
