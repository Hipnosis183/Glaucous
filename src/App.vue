<template>
  <div class="relative min-h-screen flex">
    <side-nav/>
    <div class="p-6">
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
