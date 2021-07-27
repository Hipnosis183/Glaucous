<template>
  <div class="bg-gray-300 flex max-h-screen min-h-screen relative">
    <side-nav />
    <div class="flex flex-1 overflow-hidden">
      <div class="flex-1 no-scrollbar overflow-y-scroll">
        <router-view v-slot="{ Component }">
          <div class="relative">
            <transition
              :name="$store.state.slideBack ? 'slide-route-b' : 'slide-route-f'"
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

<style lang="postcss" scoped>
/* Transitions. */
.slide-route-b-leave-active,
.slide-route-b-enter-active {
  transition: 0.5s;
}
.slide-route-b-enter-from {
  transform: translate(-100vw, 0);
}
.slide-route-b-leave-to {
  transform: translate(100vw, 0);
}
.slide-route-f-leave-active,
.slide-route-f-enter-active {
  transition: 0.5s;
}
.slide-route-f-enter-from {
  transform: translate(100vw, 0);
}
.slide-route-f-leave-to {
  transform: translate(-100vw, 0);
}
</style>