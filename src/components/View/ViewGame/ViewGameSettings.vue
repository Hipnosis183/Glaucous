<template>
  <!-- Game settings dialog. -->
  <vi-dialog
    v-if="$store.state.gameSelected.gameVersion"
    :key="$store.state.gameSelected.gameVersion"
    @close="$emit('close')"
    width="w-2/3"
    class="pos-initial z-10"
  >
    <div class="flex max-h-content overflow-hidden">
      <div class="flex-1 no-scrollbar overflow-y-scroll">
        <!-- Header. -->
        <div class="flex justify-between mb-10 mx-2">
          <!-- Title. -->
          <p class="mr-10 pt-1 text-2xl">Game Settings</p>
          <!-- Buttons. -->
          <div class="h-10 space-x-4">
            <!-- Store settings. -->
            <vi-button-icon @click="storeSettings()">
              <vi-icon class="w-6">
                <icon-check />
              </vi-icon>
            </vi-button-icon>
            <!-- Close dialog. -->
            <vi-button-icon @click="$emit('close')">
              <vi-icon class="w-6">
                <icon-close />
              </vi-icon>
            </vi-button-icon>
          </div>
        </div>
        <!-- Settings. -->
        <div class="space-y-6">
          <!-- Emulator override. -->
          <view-settings-emulator settingsType="Game" />
          <!-- Executable path. -->
          <vi-section-content>
            <p class="text-xl whitespace-nowrap">Game Path</p>
            <vi-input v-model="gamePath" />
          </vi-section-content>
          <!-- Executable command. -->
          <vi-section-content>
            <p class="text-xl whitespace-nowrap">Game File</p>
            <vi-input v-model="gameFile" />
          </vi-section-content>
          <!-- Executable parameters. -->
          <vi-section-content>
            <p class="text-xl whitespace-nowrap">Game Parameters *</p>
            <vi-input v-model="gameParams" />
          </vi-section-content>
          <!-- Relative path. -->
          <vi-section-content class="flex">
            <p class="text-xl whitespace-nowrap">Relative Path</p>
            <vi-switch v-model="relativePath" />
          </vi-section-content>
          <!-- Command preview. -->
          <vi-section-header label="Preview">
          </vi-section-header>
          <div class="bg-theme-100 dark:bg-theme-800 px-4 py-2 rounded-xl text-base text-theme-800 dark:text-theme-200 shadow-color w-full">
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
            <p class="bg-theme-100 dark:bg-theme-800 my-auto px-1.5 py-1 rounded-lg shadow-color">{relative}</p>
            <p class="my-auto"> to insert the platform's relative path, and </p>
            <p class="bg-theme-100 dark:bg-theme-800 my-auto px-1.5 py-1 rounded-lg shadow-color">{game}</p>
            <p class="my-auto"> to insert the full game path.</p>
          </div>
        </div>
      </div>
    </div>
  </vi-dialog>
</template>

<script>
// Import Vue functions.
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
// Import form components.
import ViewSettingsEmulator from '../ViewSettings/ViewSettingsEmulator.vue'

export default {
  name: 'ViewGameSettings',
  components: {
    ViewSettingsEmulator
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