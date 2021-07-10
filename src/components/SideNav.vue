<template>
  <!-- Expanded sidenav. -->
  <transition v-show="$store.state.sidenavExpanded">
    <div
      class="absolute z-10 bg-black bg-opacity-50 w-full h-full"
      @click="sidenavToggle()"
    >
    </div>
  </transition>
  <div
    class="absolute flex flex-col z-10 inset-y-0 transform w-80 bg-indigo-500 transition-all duration-500"
    :class="$store.state.sidenavExpanded ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="h-full flex-col justify-between flex">
      <div class="">
        <router-link
          to="/"
          class="text-center"
        >
          <h1 class="text-gray-100 font-semibold text-3xl my-12">Frontend</h1>
        </router-link>
        <div class="space-y-4 mt-8">
          <router-link
            to="/games"
            class="flex"
          >
            <hip-button-sb>Games</hip-button-sb>
          </router-link>
          <router-link
            to="/developers"
            class="flex"
          >
            <hip-button-sb>Developers</hip-button-sb>
          </router-link>
          <router-link
            to="/platforms"
            class="flex"
          >
            <hip-button-sb>Platforms</hip-button-sb>
          </router-link>
        </div>
      </div>
      <div class="space-y-4 mb-8">
        <div class="flex">
          <hip-button-sb>Search</hip-button-sb>
        </div>
        <div
          class="flex"
          v-show="history > 0"
        >
          <hip-button-sb @click="$router.back()">Back</hip-button-sb>
        </div>
      </div>
    </div>
    <div class="bg-indigo-600 flex justify-between">
      <el-switch
        v-model="$store.state.editMode"
        class="m-auto"
      ></el-switch>
      <button
        class="el-icon-s-fold text-gray-100 font-semibold text-2xl m-auto py-3"
        @click="sidenavToggle()"
      ></button>
    </div>
  </div>
  <!-- Small sidenav. -->
  <div class="relative w-14 bg-indigo-500 flex-col justify-between flex">
    <div class="h-full flex-col justify-between flex">
      <div class="">
        <router-link
          to="/"
          class="text-center"
        >
          <h1 class="text-gray-100 font-semibold text-3xl my-12">F</h1>
        </router-link>
        <div class="space-y-4 mt-8">
          <router-link
            to="/games"
            class="flex"
          >
            <hip-button-sb>G</hip-button-sb>
          </router-link>
          <router-link
            to="/developers"
            class="flex"
          >
            <hip-button-sb>D</hip-button-sb>
          </router-link>
          <router-link
            to="/platforms"
            class="flex"
          >
            <hip-button-sb>P</hip-button-sb>
          </router-link>
        </div>
      </div>
      <div class="space-y-4 mb-8">
        <div class="flex">
          <hip-button-sb>S</hip-button-sb>
        </div>
        <div
          class="flex"
          v-show="history > 0"
        >
          <hip-button-sb @click="$router.back()">B</hip-button-sb>
        </div>
      </div>
    </div>
    <div class="bg-indigo-600 flex justify-between">
      <button
        class="el-icon-s-unfold text-gray-100 font-semibold text-2xl m-auto py-3"
        @click="sidenavToggle()"
      ></button>
    </div>
  </div>
</template>

<script>
import { HipButtonSb } from './Component'

export default {
  components: {
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
    }
  }
}
</script>

<style>
</style>
