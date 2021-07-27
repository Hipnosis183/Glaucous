<template>
  <div>
    <!-- Navigation bar. -->
    <hip-nav-bar>
      <!-- Padding. -->
      <div class="w-full"></div>
      <p class="text-2xl m-auto mr-6">Settings</p>
    </hip-nav-bar>
    <div class="flex m-6 space-x-6">
      <hip-modal class="h-content w-full">
        <div class="flex max-h-content overflow-hidden">
          <div class="flex-1 no-scrollbar overflow-y-scroll items-center">
            <div class="flex items-center justify-between mx-8 my-6">
              <p class="text-xl">Enable edit mode</p>
              <el-switch v-model="editMode"></el-switch>
            </div>
          </div>
        </div>
      </hip-modal>
    </div>
  </div>
</template>

<script>
// Import UI components.
import {
  HipModal,
  HipNavBar
} from './Component'

export default {
  name: 'Settings',
  components: {
    // UI components.
    HipModal,
    HipNavBar
  },
  methods: {
  },
  computed: {
    editMode: {
      get() { return this.$store.state.editMode },
      set() { this.$store.commit('toggleEditMode') }
    }
  }
}
</script>

<style lang="postcss" scoped>
/* Calculations. */
.h-content {
  height: calc(100vh - 6.25rem);
}
.max-h-content {
  max-height: calc(100vh - 9.25rem);
}
</style>