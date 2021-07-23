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
      class="absolute bg-indigo-500 flex flex-col inset-y-0 w-80 z-40"
    >
      <div class="flex flex-col h-full justify-between">
        <div>
          <h1
            @click="$router.push({ name: 'Index' })"
            class="cursor-pointer font-semibold my-12 text-3xl text-center text-gray-100"
          >Frontend</h1>
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
      <div class="bg-indigo-600 flex justify-between">
        <el-switch
          v-model="$store.state.editMode"
          class="m-auto"
        ></el-switch>
        <button
          @click="sidenavToggle()"
          class="el-icon-s-fold font-semibold m-auto py-3 text-2xl text-gray-100"
        ></button>
      </div>
    </div>
  </transition>
  <!-- Small sidenav. -->
  <div class="bg-indigo-500 flex flex-col justify-between relative w-14">
    <div class="flex flex-col h-full justify-between">
      <div>
        <h1
          @click="$router.push({ name: 'Index' })"
          class="cursor-pointer font-semibold my-12 text-3xl text-center text-gray-100"
        >F</h1>
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
    <div class="bg-indigo-600 flex justify-between">
      <button
        @click="sidenavToggle()"
        class="el-icon-s-fold font-semibold m-auto py-3 text-2xl text-gray-100"
      ></button>
    </div>
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
      this.history = window.history.state.position
      this.$store.state.sidenavExpanded = false
    }
  }
}
</script>

<style scoped>
/* Transitions. */
.slide-nav-leave-active,
.slide-nav-enter-active {
  transition: all 0.5s;
}
.slide-nav-leave-to,
.slide-nav-enter-from {
  transform: translate(-100%, 0);
}
</style>