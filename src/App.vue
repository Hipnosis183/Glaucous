<template>
  <div class="bg-gray-300 flex max-h-screen min-h-screen relative">
    <side-nav />
    <div class="flex flex-1 overflow-hidden">
      <div class="flex-1 no-scrollbar overflow-y-scroll">
        <router-view v-slot="{ Component }">
          <div class="relative">
            <transition
              :name="$store.state.slideBack ? 'slide-b' : 'slide-f'"
              class="absolute bottom-0 left-0 right-0 top-0"
            >
              <component :is="Component" />
            </transition>
          </div>
        </router-view>
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