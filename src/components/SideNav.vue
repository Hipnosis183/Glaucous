<template>
  <!-- Open search dialog. -->
  <transition>
    <search
      v-show="searchDialog"
      @close="searchOpen()"
      :key="searchDialog"
      class="pos-initial z-30"
    />
  </transition>
  <!-- Expanded sidenav. -->
  <div>
    <!-- Sidenav overlay. -->
    <transition v-show="expand">
      <div
        @click="sidenavToggle()"
        class="absolute bg-black bg-opacity-50 h-full w-full z-40"
      >
      </div>
    </transition>
    <!-- Sidenav contents. -->
    <transition name="slide-nav">
      <div
        v-show="expand"
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
              <hip-button-sb @click="searchOpen()">Search</hip-button-sb>
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
  </div>
  <!-- Small sidenav. -->
  <div>
    <transition
      name="color"
      mode="out-in"
    >
      <div
        :key="$store.getters.getSettingsThemesSelectedTheme"
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
              <hip-button-sb
                @click="searchOpen()"
                class="el-icon-search h-12 text-xl"
              ></hip-button-sb>
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
// Import search component.
import Search from './Search.vue'
// Import UI components.
import { HipButtonSb } from '@/components/Component'

// Import Vue functions.
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
// Import utility functions.
import { throttle } from '@/utils/throttle'

export default {
  components: {
    // UI components.
    HipButtonSb,
    // Search component.
    Search
  },
  setup() {
    // Instantiate Vue elements.
    const route = useRoute()
    const store = useStore()

    // Manage route history for the back button.
    let history = ref(window.history.state.position)
    let expand = ref(false)
    watch(() => route.path, () => {
      // Set transition orientation depending on route position.
      store.state.slideBack = window.history.state.position > history.value ? false : true
      // Store current position of route in history.
      history.value = window.history.state.position
      // Ensure the closure of the sidenav.
      expand.value = false
    })

    // Toggle sidenav visibility.
    const sidenavToggle = throttle(() => {
      expand.value = !expand.value
    }, 500)

    // Manage search dialog display.
    let searchDialog = ref(false)
    const searchOpen = () => {
      // Open search dialog.
      searchDialog.value = !searchDialog.value
      // Close sidenav.
      if (expand.value) {
        sidenavToggle()
      }
    }

    // Return values to use on template.
    return {
      expand,
      history,
      searchDialog,
      searchOpen,
      sidenavToggle
    }
  }
}
</script>

<style scoped>
/* Transitions. */
div {
  transition: background-color 0.5s, opacity 0.5s ease;
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