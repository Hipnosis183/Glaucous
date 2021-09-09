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
      <!-- Settings. -->
      <div class="space-y-6">
        <!-- Emulator override. -->
        <view-settings-emulator settingsType="Game" />
        <!-- Executable path. -->
        <hip-section-content>
          <p class="text-xl whitespace-nowrap">Game Path</p>
          <hip-input v-model="gamePath" />
        </hip-section-content>
        <!-- Executable command. -->
        <hip-section-content>
          <p class="text-xl whitespace-nowrap">Game File</p>
          <hip-input v-model="gameFile" />
        </hip-section-content>
        <!-- Executable parameters. -->
        <hip-section-content>
          <p class="text-xl whitespace-nowrap">Game Parameters *</p>
          <hip-input v-model="gameParams" />
        </hip-section-content>
        <!-- Relative path. -->
        <hip-section-content class="flex">
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
// Import form components.
import ViewSettingsEmulator from '../ViewSettings/ViewSettingsEmulator.vue'
// Import UI components.
import {
  HipButton,
  HipInput,
  HipSectionContent,
  HipSectionHeader,
  HipSwitch
} from '@/components/Component'

// Import Vue functions.
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'ViewGameSettings',
  components: {
    // Form components.
    ViewSettingsEmulator,
    // UI components.
    HipButton,
    HipInput,
    HipSectionContent,
    HipSectionHeader,
    HipSwitch
  },
  emits: [
    'close'
  ],
  props: {
    fullCommand: { type: String }
  },
  setup(props, { emit }) {
    // Instantiate Vue elements.
    const store = useStore()

    // Initialize the current game settings on the store.
    onMounted(() => { store.commit('setGameStore') })

    // Manage settings in the store.
    const gamePath = computed({
      get() { return store.state.settingsGame.gamePath },
      set(value) { store.state.settingsGame.gamePath = value }
    })
    const gameFile = computed({
      get() { return store.state.settingsGame.gameFile },
      set(value) { store.state.settingsGame.gameFile = value }
    })
    const gameParams = computed({
      get() { return store.state.settingsGame.gameParams },
      set(value) { store.state.settingsGame.gameParams = value }
    })
    const relativePath = computed({
      get() { return store.state.settingsGame.relativePath },
      set(value) { store.state.settingsGame.relativePath = value }
    })
    const storeSettings = () => {
      // Store updated settings.
      store.commit('setSettingsGameEmulator')
      store.commit('setSettingsGameGamePath')
      store.commit('setSettingsGameGameFile')
      store.commit('setSettingsGameGameParams')
      store.commit('setSettingsGameRelativePath')
      emit('close')
    }

    return {
      gameFile,
      gameParams,
      gamePath,
      relativePath,
      storeSettings
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