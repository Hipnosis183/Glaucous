<template>
  <div class="relative min-h-screen flex">
    <side-nav/>
    <router-view/>
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
