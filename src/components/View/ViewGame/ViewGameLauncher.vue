<template>
  <!-- Launcher error dialog. -->
  <vi-dialog-box
    v-show="launchErrorDialog"
    @accept="launchErrorShow()"
  >
    An error has ocurred when launching the game.
    <br />
    Check if your configuration is correct and try again.
  </vi-dialog-box>
  <!-- View game launcher. -->
  <div class="flex flex-col mt-auto space-y-2">
    <!-- Top container. -->
    <div class="flex space-x-2">
      <!-- Plat game button. -->
      <vi-button-ui
        v-if="hideElementsLaunch"
        button-large
        button-size="large"
        @click="launchGame()"
      >
        <div class="flex pl-2 pr-6 space-x-4 w-full">
          <vi-icon
            icon-manual
            class="w-10"
          >
            <icon-play />
          </vi-icon>
          <h6>Play</h6>
        </div>
      </vi-button-ui>
      <!-- View game linking. -->
      <view-game-linking
        v-if="hideElementsLinking && !hideElementsVersions"
        :key="gameInfo"
        :game-info="gameInfo"
        :icon-large="'large'"
        :region-index="regionIndex"
      />
      <!-- View game settings. -->
      <view-game-settings
        v-if="hideElementsSettingsGame && !hideElementsVersions"
        :full-command="fullCommand"
        :icon-large="'large'"
      />
    </div>
    <!-- Bottom container. -->
    <div
      v-if="hideElementsVersions && (hideElementsLinking || hideElementsSettingsGame)"
      class="flex space-x-2"
    >
      <!-- Game version select. -->
      <vi-select-ui
        v-if="hideElementsVersions"
        v-model="$store.state.gameSelected.gameVersion"
      >
        <vi-option-group-ui
          v-for="type in typeOptions()"
          :key="type.i"
          :label="type.name"
        >
          <vi-option-ui
            v-for="item in typeFilter(type)"
            :key="item._id"
            :label="gameInfo.gameRegions[regionIndex].title + (item.name ? ' (' + item.name + ')' : item.number ? ' (' + item.number + ')' : '')"
            :value="item._id"
            @click="changeVersion(item._id)"
          />
        </vi-option-group-ui>
      </vi-select-ui>
      <!-- View game linking. -->
      <view-game-linking
        v-if="hideElementsLinking && hideElementsVersions"
        :key="gameInfo"
        :game-info="gameInfo"
        :region-index="regionIndex"
      />
      <!-- View game settings. -->
      <view-game-settings
        v-if="hideElementsSettingsGame && hideElementsVersions"
        :full-command="fullCommand"
      />
    </div>
  </div>
</template>

<script>
// Import Vue functions.
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
// Import functions from modules.
import { app } from '@electron/remote'
import { exec } from 'child_process'
import { existsSync, readJSONSync } from 'fs-extra'
// Import database controllers functions.
import { addRecent } from '@/database/controllers/User'
// Import form components.
import ViewGameLinking from './ViewGameLinking.vue'
import ViewGameSettings from './ViewGameSettings.vue'

export default {
  name: 'ViewGameLauncher',
  components: {
    ViewGameLinking,
    ViewGameSettings
  },
  emits: [
    'updated'
  ],
  props: {
    gameInfo: { type: Object },
    regionIndex: { type: Number }
  },
  setup(props, { emit }) {
    // Instantiate Vue elements.
    const store = useStore()

    // Manage game launching.
    let gamePath = ref(null)
    let emulatorPath = ref(null)
    const launchGame = () => {
      // Define execution options.
      let gameOptions = {
        cwd: emulatorPath.value ? emulatorPath.value.length > 0 ? emulatorPath.value : gamePath.value : gamePath.value
      }
      // Execute command.
      exec(fullCommand.value, gameOptions, (error) => {
        if (error) {
          // Log error and display message.
          console.log(error)
          launchErrorShow()
        } else {
          // Add launched game to the recently played list.
          addRecent(props.gameInfo._id)
        }
      })
    }
    let launchErrorDialog = ref(false)
    const launchErrorShow = () => {
      // Toggle game launch error dialog.
      launchErrorDialog.value = !launchErrorDialog.value
    }

    // Manage emulators.
    let emulatorGame = ref(null)
    let emulatorPlatform = ref(null)
    const emulatorFile = app.getAppPath() + '/data/emulators.json'
    const loadEmulator = () => {
      // Reset emulators.
      emulatorPlatform.value = null
      emulatorGame.value = null
      // Read emulator file.
      if (existsSync(emulatorFile)) {
        readJSONSync(emulatorFile).forEach((res) => {
          if (res.id == store.state.settingsPlatform.emulator) {
            // Load emulator configuration for the selected platform.
            emulatorPlatform.value = res
          }
          if (res.id == store.state.settingsGame.emulator) {
            // Load emulator configuration for the selected game.
            emulatorGame.value = res
          }
        })
      }
    }

    // Load emulator on component creation.
    loadEmulator()

    // Watch for changes on the selected emulator.
    const emulatorStore = computed(() => {
      return store.state.settingsGame.emulator
    })
    watch(() => emulatorStore.value, () => { loadEmulator() })

    // Define emulator and game paths.
    const fullCommand = computed(() => {
      // Return command to execute.
      return fullEmulatorPath.value + fullGamePath.value
    })
    const fullEmulatorPath = computed(() => {
      let emulator = emulatorGame.value ? emulatorGame.value : emulatorPlatform.value
      if (emulator != null) {
        let _emulatorPath = emulator.path + '/' + emulator.file
        // Set the platform executable path as the current working directory.
        emulatorPath.value = emulator.path
        // Return full platform command.
        return '"' + _emulatorPath + '" ' + (emulator.params ? emulator.params + ' ' : '')
      } else {
        return ''
      }
    })
    const fullGamePath = computed(() => {
      // Wait for the settings to be loaded.
      if (store.state.settingsGame.gamePath != null) {
        let _gamePath = (store.state.settingsGame.relativePath ? store.state.settingsPlatform.relativePath + '/' : '') + store.state.settingsGame.gamePath
        // Set the game path as the current working directory.
        gamePath.value = _gamePath
        // Check and replace the '{relative}' and '{game}' variables.
        let gameParams = store.state.settingsGame.gameParams.replaceAll('{relative}', store.state.settingsPlatform.relativePath)
        gameParams = gameParams.replaceAll('{game}', _gamePath)
        // Return full game command.
        return (store.state.settingsGame.gameFile ? '"' + _gamePath + (store.state.settingsGame.gamePath ? '/' : '') + store.state.settingsGame.gameFile + '" ' : '') + gameParams
      }
    })

    // Manage game settings.
    const changeVersion = (id) => {
      // Update the store with the new game version selected.
      store.commit('setGameStore')
      // Send selected game version index to parent component.
      let index = props.gameInfo.gameRegions[props.regionIndex].gameVersions.findIndex((res) => res._id == id)
      emit('updated', index)
    }

    // Manage version select options.
    const typeOptionsGroup = [
      { i: null, name: 'Game Versions' },
      { i: 'patch', name: 'Patches' },
      { i: 'romhack', name: 'ROM Hacks' },
      { i: 'translation', name: 'Translations' }
    ]
    const typeOptions = () => {
      let typeOptionGroup = []
      // Return the groups that have games on them.
      for (let typeOption of typeOptionsGroup) {
        let gameVersions = typeFilter(typeOption)
        if (gameVersions.length > 0) { typeOptionGroup.push(typeOption) }
      }
      return typeOptionGroup
    }
    const typeFilter = (type) => {
      // Filter game versions matching the specified type.
      return props.gameInfo.gameRegions[props.regionIndex].gameVersions.filter((res) => type.i ? res.type == type.i : res.type == type.i || res.type == '')
    }

    // Manage elements display state.
    const hideElementsLaunch = computed(() => {
      return !store.getters.getSettingsGameHideElementsLaunch
    })
    const hideElementsVersions = computed(() => {
      return !store.getters.getSettingsGameHideElementsVersions
    })
    const hideElementsLinking = computed(() => {
      return !store.getters.getSettingsGameHideElementsLinking
    })
    const hideElementsSettingsGame = computed(() => {
      return !store.getters.getSettingsGameHideElementsSettingsGame
    })

    return {
      changeVersion,
      fullCommand,
      gamePath,
      launchErrorShow,
      launchErrorDialog,
      launchGame,
      hideElementsLaunch,
      hideElementsLinking,
      hideElementsSettingsGame,
      hideElementsVersions,
      typeFilter,
      typeOptions
    }
  }
}
</script>

<style>
</style>