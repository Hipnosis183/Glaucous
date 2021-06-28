<template>
  <div class="flex min-h-screen max-h-screen relative bg-gray-100">
    <side-nav />
    <div class="p-6 w-full">
      <div class="bg-white p-6 rounded-xl shadow">
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
