<template>
  <!-- Expanded sidenav. -->
  <!-- Sidenav overlay. -->
  <transition v-show="$store.state.sidenavExpanded">
    <div
      @click="sidenavToggle()"
      class="absolute bg-black bg-opacity-50 h-full w-full z-40"
    >
    </div>
  </transition>
  <!-- Sidenav contents. -->
  <transition name="slide-nav">
    <div
      v-show="$store.state.sidenavExpanded"
      class="absolute bg-color-500 flex flex-col inset-y-0 w-80 z-40"
    >
      <!-- Logo bar. -->
      <div class="bg-color-700 text-center">
        <h6
          @click="$router.push({ name: 'Index' })"
          class="cursor-pointer font-semibold my-8 text-3xl text-color-300"
        >Frontend</h6>
      </div>
      <!-- Buttons. -->
      <div class="flex flex-col h-full justify-between">
        <div>
          <div class="mt-8 space-y-4">
            <div class="flex">
              <hip-button-sb @click="$router.push({ name: 'ListGames' })">Games</hip-button-sb>
            </div>
            <div class="flex">
              <hip-button-sb @click="$router.push({ name: 'ListDevelopers' })">Developers</hip-button-sb>
            </div>
            <div class="flex">
              <hip-button-sb @click="$router.push({ name: 'ListPlatforms' })">Platforms</hip-button-sb>
            </div>
          </div>
        </div>
        <div class="mb-8 space-y-4">
          <div class="flex">
            <hip-button-sb>Search</hip-button-sb>
          </div>
          <div v-show="history > 0">
            <div class="flex">
              <hip-button-sb @click="$router.back()">Back</hip-button-sb>
            </div>
          </div>
        </div>
      </div>
      <!-- Bottom bar. -->
      <div class="bg-color-700 flex justify-between">
        <button
          @click="$router.push({ name: 'Settings' })"
          class="el-icon-s-tools m-auto py-3 text-2xl text-color-300"
        ></button>
        <button
          @click="sidenavToggle()"
          class="el-icon-s-fold m-auto py-3 text-2xl text-color-300"
        ></button>
      </div>
    </div>
  </transition>
  <!-- Small sidenav. -->
  <div>
    <transition
      name="color"
      mode="out-in"
    >
      <div
        :key="$store.state.selectedTheme"
        class="bg-color-500 flex flex-col h-full justify-between relative w-14"
      >
        <!-- Logo bar. -->
        <div class="bg-color-700 text-center">
          <h6
            @click="$router.push({ name: 'Index' })"
            class="cursor-pointer font-semibold my-8 text-3xl text-color-300"
          >F</h6>
        </div>
        <!-- Buttons. -->
        <div class="flex flex-col h-full justify-between">
          <div>
            <div class="mt-8 space-y-4">
              <div class="flex">
                <hip-button-sb @click="$router.push({ name: 'ListGames' })">G</hip-button-sb>
              </div>
              <div class="flex">
                <hip-button-sb @click="$router.push({ name: 'ListDevelopers' })">D</hip-button-sb>
              </div>
              <div class="flex">
                <hip-button-sb @click="$router.push({ name: 'ListPlatforms' })">P</hip-button-sb>
              </div>
            </div>
          </div>
          <div class="mb-8 space-y-4">
            <div class="flex">
              <hip-button-sb class="el-icon-search h-12 text-xl"></hip-button-sb>
            </div>
            <div v-show="history > 0">
              <div class="flex">
                <hip-button-sb
                  @click="$router.back()"
                  class="el-icon-back h-12 text-xl"
                ></hip-button-sb>
              </div>
            </div>
          </div>
        </div>
        <!-- Bottom bar. -->
        <div class="bg-color-700 flex justify-between">
          <button
            @click="sidenavToggle()"
            class="el-icon-s-unfold m-auto py-3 text-2xl text-color-300"
          ></button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
// Import UI components.
import { HipButtonSb } from './Component'

export default {
  components: {
    // UI components.
    HipButtonSb
  },
  data() {
    return {
      history: window.history.state.position
    }
  },
  methods: {
    sidenavToggle() {
      this.$store.state.sidenavExpanded = !this.$store.state.sidenavExpanded
    }
  },
  watch: {
    // Watch for route changes to display the back button.
    '$route'(to, from) {
      this.$store.state.slideBack = window.history.state.position > this.history ? false : true
      this.history = window.history.state.position
      this.$store.state.sidenavExpanded = false
    }
  }
}
</script>

<style scoped>
/* Transitions. */
div {
  transition: background-color 1s;
}
.slide-nav-leave-active,
.slide-nav-enter-active {
  transition: all 0.5s;
}
.slide-nav-leave-to,
.slide-nav-enter-from {
  transform: translate(-100%, 0);
}
</style>