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
        <hip-section-content>
          <!-- Executable command. -->
          <p class="text-xl whitespace-nowrap">Game File</p>
          <hip-input v-model="gameFile" />
        </hip-section-content>
        <hip-section-content>
          <!-- Executable parameters. -->
          <p class="text-xl whitespace-nowrap">Game Parameters *</p>
          <hip-input v-model="gameParams" />
        </hip-section-content>
        <hip-section-content class="flex">
          <!-- Relative path. -->
          <p class="text-xl whitespace-nowrap">Relative Path</p>
          <hip-switch v-model="relativePath" />
        </hip-section-content>
        <!-- Command preview. -->
        <hip-section-header label="Preview">
        </hip-section-header>
        <div class="bg-theme-100 dark:bg-theme-800 px-4 py-2 rounded-xl text-base text-theme-800 dark:text-theme-200 shadow w-full">
          <div
            v-if="fullCommand"
            class="cursor-default"
          >{{ fullCommand }}</div>
          <div
            v-else
            class="invisible"
          >.</div>
        </div>
        <!-- Parameters aclaration. -->
        <div class="flex space-x-1 text-sm whitespace-nowrap">
          <p class="my-auto">* You can use the variables </p>
          <p class="bg-theme-100 dark:bg-theme-800 my-auto px-1.5 py-1 rounded-lg shadow">{relative}</p>
          <p class="my-auto"> to insert the platform's relative path, and </p>
          <p class="bg-theme-100 dark:bg-theme-800 my-auto px-1.5 py-1 rounded-lg shadow">{game}</p>
          <p class="my-auto"> to insert the full game path.</p>
        </div>
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
    'fullCommand'
  ],
  methods: {
    storeSettings() {
      // Store updated settings.
      this.$store.commit('setSettingsGameGamePath')
      this.$store.commit('setSettingsGameGameFile')
      this.$store.commit('setSettingsGameGameParams')
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
    gameFile: {
      get() { return this.$store.state.settingsGame.gameFile },
      set(value) { this.$store.state.settingsGame.gameFile = value }
    },
    gameParams: {
      get() { return this.$store.state.settingsGame.gameParams },
      set(value) { this.$store.state.settingsGame.gameParams = value }
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