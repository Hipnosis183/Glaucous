<template>
  <div class="bg-gray-100 flex max-h-screen min-h-screen relative">
    <side-nav />
    <div class="flex flex-1 overflow-hidden">
      <div class="flex-1 no-scrollbar overflow-y-scroll">
        <router-view v-slot="{ Component }">
          <div class="relative">
            <transition
              :name="$store.state.slideBack ? 'slide-b' : 'slide-f'"
              class="absolute bottom-0 left-0 right-0 top-0"
            >
              <component
                :is="Component"
                :key="$route.fullPath"
              />
            </transition>
          </div>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script>
// Import sidenav component.
import SideNav from './components/SideNav.vue'
// Import theme objects and functions.
import {
  colors,
  selectTheme
} from './theme'

export default {
  components: {
    SideNav
  },
  created() {
    // Set theme stored in the configuration.
    selectTheme(colors[this.$store.state.selectedTheme].codes)
  }
}
</script>

<style>
</style>