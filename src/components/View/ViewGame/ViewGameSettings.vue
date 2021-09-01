<template>
  <div class="flex max-h-content overflow-hidden">
    <div class="flex-1 no-scrollbar overflow-y-scroll">
      <!-- Header. -->
      <div class="flex justify-between mb-10 mx-2">
        <!-- Title. -->
        <p class="mr-10 pt-1 text-2xl">Game Settings</p>
        <!-- Buttons. -->
        <div class="h-10 space-x-4">
          <!-- Store settings. -->
          <hip-button
            :icon="true"
            @click="storeSettings()"
            class="el-icon-circle-check text-2xl"
          ></hip-button>
          <!-- Close dialog. -->
          <hip-button
            :icon="true"
            @click="$emit('close')"
            class="el-icon-circle-close text-2xl"
          ></hip-button>
        </div>
      </div>
      <div class="space-y-6">
        <!-- Settings. -->
        <hip-section-content>
          <!-- Executable path. -->
          <p class="text-xl whitespace-nowrap">Game Path</p>
          <hip-input v-model="gamePath" />
        </hip-section-content>
        <hip-section-content class="flex">
          <!-- Relative path. -->
          <p class="text-xl whitespace-nowrap">Relative Path</p>
          <hip-switch v-model="relativePath" />
        </hip-section-content>
        <hip-section-header label="Preview">
          <!-- Command preview. -->
          <div class="bg-theme-100 dark:bg-theme-800 px-4 py-2 rounded-xl text-base text-theme-800 dark:text-theme-200 shadow w-full">
            <div class="cursor-default">{{ gameCommand }}</div>
          </div>
        </hip-section-header>
      </div>
    </div>
  </div>
</template>

<script>
// Import UI components.
import {
  HipButton,
  HipInput,
  HipSectionContent,
  HipSectionHeader,
  HipSwitch
} from '../../Component'

export default {
  name: 'ViewGameSettings',
  components: {
    // UI components.
    HipButton,
    HipInput,
    HipSectionContent,
    HipSectionHeader,
    HipSwitch
  },
  props: [
    'gameCommand'
  ],
  methods: {
    storeSettings() {
      // Store updated settings.
      this.$store.commit('setSettingsGameGamePath')
      this.$store.commit('setSettingsGameRelativePath')
      this.$emit('close')
    }
  },
  mounted() {
    // Initialize the current game settings on the store.
    this.$store.commit('setGameStore')
  },
  computed: {
    gamePath: {
      get() { return this.$store.state.settingsGame.gamePath },
      set(value) { this.$store.state.settingsGame.gamePath = value }
    },
    relativePath: {
      get() { return this.$store.state.settingsGame.relativePath },
      set(value) { this.$store.state.settingsGame.relativePath = value }
    }
  }
}
</script>

<style scoped>
/* Calculations. */
.max-h-content {
  max-height: calc(100vh - 6.25rem);
}
</style>