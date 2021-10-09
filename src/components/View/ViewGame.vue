<template>
  <div>
    <!-- Create game platform dialog. -->
    <create-game-platform
      v-show="createPlatformDialog"
      @close="createPlatformClose()"
    />
    <!-- Create game region dialog. -->
    <create-game-region
      v-show="createRegionDialog"
      @close="createRegionClose()"
    />
    <!-- Create game version dialog. -->
    <create-game-version
      v-show="createVersionDialog"
      @close="createVersionClose()"
    />
    <!-- Edit game dialog. -->
    <edit-game
      v-show="editGameDialog"
      :gameDeveloper="gameInfo.developer._id"
      :gamePlatform="gameInfo.platform._id"
      @close="editGameClose()"
    />
    <!-- Delete game region dialog. -->
    <vi-dialog
      v-show="deleteRegionDialog"
      @close="deleteRegionOpen()"
      class="z-10"
    >
      <!-- Dialog message. -->
      <p class="text-center text-lg">
        Delete region <b>'{{ gameInfo.gameRegions[regionIndex].regionName }}'</b>
        from game <b>'{{ fullTitle }}'</b> ?
        <br />
        It will also delete all its versions.
      </p>
      <!-- Dialog buttons. -->
      <div class="flex justify-center mt-6 space-x-4">
        <!-- Confirm game deletion. -->
        <vi-button-icon @click="deleteRegionClose()">
          <vi-icon class="w-6">
            <icon-check />
          </vi-icon>
        </vi-button-icon>
        <!-- Cancel game deletion. -->
        <vi-button-icon @click="deleteRegionOpen()">
          <vi-icon class="w-6">
            <icon-close />
          </vi-icon>
        </vi-button-icon>
      </div>
    </vi-dialog>
    <!-- Delete game version dialog. -->
    <vi-dialog
      v-show="deleteVersionDialog"
      @close="deleteVersionOpen()"
      class="z-10"
    >
      <!-- Dialog message. -->
      <p class="text-center text-lg">
        Delete the selected version from game <b>'{{ fullTitle }}'</b> ?
        <br />
        If it's the only version, it will also delete the region.
      </p>
      <!-- Dialog buttons. -->
      <div class="flex justify-center mt-6 space-x-4">
        <!-- Confirm game deletion. -->
        <vi-button-icon @click="deleteVersionClose()">
          <vi-icon class="w-6">
            <icon-check />
          </vi-icon>
        </vi-button-icon>
        <!-- Cancel game deletion. -->
        <vi-button-icon @click="deleteVersionOpen()">
          <vi-icon class="w-6">
            <icon-close />
          </vi-icon>
        </vi-button-icon>
      </div>
    </vi-dialog>
    <!-- Delete game platform dialog. -->
    <vi-dialog
      v-show="deletePlatformDialog"
      @close="deletePlatformOpen()"
      class="z-10"
    >
      <!-- Dialog message. -->
      <p class="text-center text-lg">
        Delete game <b>'{{ fullTitle }}'</b> ?
        <br />
        It will also delete all its regions and versions.
      </p>
      <!-- Dialog buttons. -->
      <div class="flex justify-center mt-6 space-x-4">
        <!-- Confirm game deletion. -->
        <vi-button-icon @click="deletePlatformClose()">
          <vi-icon class="w-6">
            <icon-check />
          </vi-icon>
        </vi-button-icon>
        <!-- Cancel game deletion. -->
        <vi-button-icon @click="deletePlatformOpen()">
          <vi-icon class="w-6">
            <icon-close />
          </vi-icon>
        </vi-button-icon>
      </div>
    </vi-dialog>
    <!-- Playlists management dialog. -->
    <view-game-playlists
      v-show="managePlaylistsDialog"
      @close="managePlaylistsClose()"
    />
    <!-- Navigation bar. -->
    <vi-nav-bar>
      <!-- Create games menu dialog. -->
      <vi-menu-select
        v-show="$store.getters.getSettingsGeneralEditMode"
        icon="icon-add"
      >
        <!-- Open create game platform dialog. -->
        <vi-menu-option
          label="Create Game Platform"
          :method="createPlatformOpen"
        />
        <!-- Open create game region dialog. -->
        <vi-menu-option
          label="Create Game Region"
          :method="createRegionOpen"
        />
        <!-- Open create game version dialog. -->
        <vi-menu-option
          label="Create Game Version"
          :method="createVersionOpen"
        />
      </vi-menu-select>
      <!-- Open edit game dialog. -->
      <vi-button-nb
        v-show="$store.getters.getSettingsGeneralEditMode"
        @click="editGameOpen()"
      >
        <vi-icon class="w-6">
          <icon-edit />
        </vi-icon>
      </vi-button-nb>
      <!-- Delete games menu dialog. -->
      <vi-menu-select
        v-show="$store.getters.getSettingsGeneralEditMode"
        icon="icon-remove"
      >
        <!-- Open create game platform dialog. -->
        <vi-menu-option
          label="Delete Game Platform"
          :method="deletePlatformOpen"
        />
        <!-- Open create game region dialog. -->
        <vi-menu-option
          label="Delete Game Region"
          :method="deleteRegionOpen"
        />
        <!-- Open create game version dialog. -->
        <vi-menu-option
          label="Delete Game Version"
          :method="deleteVersionOpen"
        />
      </vi-menu-select>
      <!-- Create games menu dialog. -->
      <vi-menu-select
        v-show="$store.getters.getSettingsGeneralEditMode"
        icon="icon-folder"
      >
        <!-- Open create game region dialog. -->
        <vi-menu-option
          label="Open Game Directory"
          :method="openGamePath"
        />
        <!-- Open create game platform dialog. -->
        <vi-menu-option
          label="Open Store Directory"
          :method="openStorePath"
        />
        <!-- Open create game version dialog. -->
        <vi-menu-option
          label="Open Images Directory"
          :method="openImagesPath"
        />
      </vi-menu-select>
      <!-- Set selected game region as the main region. -->
      <vi-button-nb
        v-show="$store.getters.getSettingsGeneralEditMode"
        @click="setGameRegion()"
      >
        <vi-icon class="w-6">
          <icon-pin />
        </vi-icon>
      </vi-button-nb>
      <!-- Remove selected game platform from favorites. -->
      <vi-button-nb
        v-if="gameFavorited"
        @click="removeFavorite()"
      >
        <vi-icon class="w-6">
          <icon-star-f />
        </vi-icon>
      </vi-button-nb>
      <!-- Add selected game platform to favorites. -->
      <vi-button-nb
        v-else
        @click="addFavorite()"
      >
        <vi-icon class="w-6">
          <icon-star />
        </vi-icon>
      </vi-button-nb>
      <!-- Open game playlists management dialog. -->
      <vi-button-nb @click="managePlaylistsClose()">
        <vi-icon class="w-6">
          <icon-playlist-add />
        </vi-icon>
      </vi-button-nb>
      <!-- Game region tabs. -->
      <ul class="flex h-full w-full">
        <li
          v-for="(region, index) in gameInfo.gameRegions"
          :key="region._id"
          :value="region._id"
          class="h-full relative w-full"
        >
          <!-- Region tab button. -->
          <button
            class="h-full relative w-full"
            :class="index == regionIndex ? 'border-b-4 border-color-400' : ''"
          >
            <div
              class="absolute h-full top-0 w-full"
              :class="index == regionIndex ? 'bg-color-500 opacity-50' : ''"
            />
            <div class="h-full inline-flex items-center relative">
              <p>{{ gameInfo.gameRegions[index].regionName }}</p>
            </div>
          </button>
          <div
            @click="changeRegion(index)"
            class="absolute cursor-pointer h-full top-0 w-full"
          />
        </li>
      </ul>
    </vi-nav-bar>
    <!-- Game information. -->
    <div class="relative">
      <transition
        :name="slideBack ? 'slide-b' : 'slide-f'"
        class="absolute bottom-0 left-0 right-0 top-0"
      >
        <div
          :key="regionIndex"
          class="flex m-6 space-x-6"
        >
          <!-- Left card. -->
          <vi-modal class="h-content w-3/5">
            <div class="flex flex-col max-h-content min-h-content overflow-hidden">
              <div class="flex-1 no-scrollbar overflow-y-scroll">
                <!-- Insert game info component. -->
                <view-game-info
                  :key="gameInfo"
                  :fullTitle="fullTitle"
                  :gameInfo="gameInfo"
                  :regionIndex="regionIndex"
                  :versionIndex="versionIndex"
                />
              </div>
              <!-- Insert game links component. -->
              <view-game-links
                :key="gameInfo"
                :fullTitle="fullTitle"
                :gameInfo="gameInfo"
                :gameRegion="gameInfo.gameRegions[regionIndex]"
                @loaded="loadLinks($event)"
              />
            </div>
          </vi-modal>
          <!-- Right card. -->
          <vi-modal class="h-content w-2/5">
            <div class="flex flex-col max-h-content min-h-content overflow-hidden">
              <div class="flex-1 no-scrollbar overflow-y-scroll p-0.5">
                <!-- Insert game images component. -->
                <view-game-images
                  :key="gameInfo"
                  :gameInfo="gameInfo"
                  :regionIndex="regionIndex"
                  :versionIndex="versionIndex"
                />
              </div>
              <!-- Insert game launcher component. -->
              <view-game-launcher
                :key="gameInfo"
                :gameInfo="gameInfo"
                :regionIndex="regionIndex"
                @updated="versionIndex = $event"
              />
            </div>
          </vi-modal>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
// Import Vue functions.
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
// Import functions from modules.
import { app, shell } from '@electron/remote'
// Import database controllers functions.
import { getGame, deleteGamePlatform, deleteGameRegion, deleteGameVersion, selectGameRegion } from '@/database/controllers/Game'
import { addFavorites, getFavorite, removeFavorites } from '@/database/controllers/User'
// Import form components.
import CreateGamePlatform from '@/components/Create/CreateGamePlatform.vue'
import CreateGameRegion from '@/components/Create/CreateGameRegion.vue'
import CreateGameVersion from '@/components/Create/CreateGameVersion.vue'
import EditGame from '@/components/Edit/EditGame.vue'
// Import game page components.
import ViewGameImages from './ViewGame/ViewGameImages.vue'
import ViewGameInfo from './ViewGame/ViewGameInfo.vue'
import ViewGameLauncher from './ViewGame/ViewGameLauncher.vue'
import ViewGameLinks from './ViewGame/ViewGameLinks.vue'
import ViewGamePlaylists from './ViewGame/ViewGamePlaylists.vue'

export default {
  name: 'ViewGame',
  components: {
    CreateGamePlatform,
    CreateGameRegion,
    CreateGameVersion,
    EditGame,
    ViewGameImages,
    ViewGameInfo,
    ViewGameLauncher,
    ViewGameLinks,
    ViewGamePlaylists
  },
  setup() {
    // Instantiate Vue elements.
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    // Load game information on mounting.
    onMounted(() => { loadGame() })

    // Load and manage game information.
    let regionIndex = ref(0)
    let versionIndex = ref(0)
    let gameInfo = ref({
      developer: { name: null },
      platform: { name: null },
      releaseYear: null,
      numberPlayers: null,
      links: [],
      gamePlatforms: [],
      gameRegions: [{
        title: null,
        subTitle: null,
        originalTitle: null,
        romanizedTitle: null,
        translatedTitle: null,
        region: null,
        serial: null,
        gameVersions: [{
          name: null,
          number: null,
          latest: null,
          comments: []
        }]
      }]
    })
    const fullTitle = computed(() => {
      let fullTitle = gameInfo.value.gameRegions[regionIndex.value].title
      if (gameInfo.value.gameRegions[regionIndex.value].subTitle) {
        fullTitle = fullTitle + ' ' + gameInfo.value.gameRegions[regionIndex.value].subTitle
      }
      if (gameInfo.value.gameRegions[regionIndex.value].preTitle) {
        fullTitle = gameInfo.value.gameRegions[regionIndex.value].preTitle + ' ' + fullTitle
      }
      return fullTitle
    })
    const loadGame = () => {
      // Get game.
      getGame(route.params.id)
        .then((res) => {
          gameInfo.value = res
          // Save current platform ID into the store.
          store.state.selectedPlatform = res.platform._id
          store.commit('setPlatformStore')
          // Save current game IDs into the store.
          store.state.gameSelected.gamePlatform = res._id
          store.state.gameSelected.gameRegion = res.gameRegions[regionIndex.value]._id
          store.state.gameSelected.gameVersion = res.gameRegions[regionIndex.value].gameVersions[versionIndex.value]._id
          // Set game store path.
          setGamePath(res.platform._id + '/' + res._id + '/games/' + res.gameRegions[regionIndex.value]._id)
          // Set initial favorited status.
          updateFavorite()
        })
    }
    const loadLinks = (res) => {
      // Get links.
      gameInfo.value.links = res
    }

    // Manage game editing operations.
    let editGameDialog = ref(false)
    const editGameOpen = () => {
      // Restore the data on the store.
      store.commit('resetGameForm')
      // Save data of the current game into the store.
      store.commit('setGameForm', {
        platform: gameInfo.value,
        region: gameInfo.value.gameRegions[regionIndex.value],
        version: gameInfo.value.gameRegions[regionIndex.value].gameVersions[versionIndex.value]
      })
      // Open edit dialog.
      editGameDialog.value = !editGameDialog.value
    }
    const editGameClose = () => {
      // Reload game.
      loadGame()
      // Close edit dialog.
      editGameDialog.value = !editGameDialog.value
    }

    // Manage game platform operations.
    let createPlatformDialog = ref(false)
    const createPlatformOpen = () => {
      // Restore the data on the store.
      store.commit('resetGameForm')
      // Open create dialog.
      createPlatformDialog.value = !createPlatformDialog.value
    }
    const createPlatformClose = () => {
      // Reload game.
      loadGame()
      // Close create dialog.
      createPlatformDialog.value = !createPlatformDialog.value
    }
    let deletePlatformDialog = ref(false)
    const deletePlatformOpen = () => {
      // Open delete dialog.
      deletePlatformDialog.value = !deletePlatformDialog.value
    }
    const deletePlatformClose = () => {
      // Delete game platform.
      deleteGamePlatform(gameInfo.value)
        .then(() => router.back())
    }

    // Manage game region operations.
    let createRegionDialog = ref(false)
    const createRegionOpen = () => {
      // Restore the data on the store.
      store.commit('resetGameForm')
      // Save data of the current game region into the store.
      store.commit('setGameRegionTitle', gameInfo.value.gameRegions[regionIndex.value].title)
      store.commit('setGameRegionSubTitle', gameInfo.value.gameRegions[regionIndex.value].subTitle)
      // Open create dialog.
      createRegionDialog.value = !createRegionDialog.value
    }
    const createRegionClose = () => {
      // Reload game.
      loadGame()
      // Close create dialog.
      createRegionDialog.value = !createRegionDialog.value
    }
    let deleteRegionDialog = ref(false)
    const deleteRegionOpen = () => {
      // Open delete dialog.
      deleteRegionDialog.value = !deleteRegionDialog.value
    }
    const deleteRegionClose = () => {
      // Delete game region.
      deleteGameRegion(gameInfo.value, regionIndex.value)
        .then((res) => {
          // If the game had multiple regions.
          if (res) {
            // Reload updated game entry.
            loadGame()
            // Reset selected region.
            regionIndex.value = 0
            // Reset selected version.
            versionIndex.value = 0
            // Close delete dialog.
            deleteRegionDialog.value = !deleteRegionDialog.value
          } else {
            // If the game only had one region.
            router.back()
          }
        })
    }

    // Manage game version operations.
    let createVersionDialog = ref(false)
    const createVersionOpen = () => {
      // Restore the data on the store.
      store.commit('resetGameForm')
      // Open create dialog.
      createVersionDialog.value = !createVersionDialog.value
    }
    const createVersionClose = () => {
      // Reload game.
      loadGame()
      // Close create dialog.
      createVersionDialog.value = !createVersionDialog.value
    }
    let deleteVersionDialog = ref(false)
    const deleteVersionOpen = () => {
      // Open delete dialog.
      deleteVersionDialog.value = !deleteVersionDialog.value
    }
    const deleteVersionClose = () => {
      // Delete game region.
      deleteGameVersion(gameInfo.value, regionIndex.value, versionIndex.value)
        .then((res) => {
          // If the game had multiple regions.
          if (res) {
            // Reload updated game entry.
            loadGame()
            // Reset selected version.
            versionIndex.value = 0
            // Close delete dialog.
            deleteVersionDialog.value = !deleteVersionDialog.value
          } else {
            // If the game only had one region.
            router.back()
          }
        })
    }

    // Manage game directories opening.
    let gamePath = null
    const setGamePath = (path) => {
      gamePath = app.getAppPath() + '/data/' + path
    }
    const openGamePath = () => {
      // Open game file location path in the file manager.
      shell.openPath((store.state.settingsGame.relativePath ? store.state.settingsPlatform.relativePath + '/' : '') + store.state.settingsGame.gamePath)
    }
    const openStorePath = () => {
      // Open game store location path in the file manager.
      shell.openPath(gamePath)
    }
    const openImagesPath = () => {
      // Open images location path in the file manager.
      shell.openPath(gamePath + '/images')
    }

    // Region selection operations.
    let slideBack = ref(false)
    const changeRegion = (sel) => {
      // Set sliding transition orientation.
      slideBack.value = sel < regionIndex.value ? true : false
      // Reset version index.
      versionIndex.value = 0
      // Set region index.
      regionIndex.value = sel
      // Save current game IDs into the store.
      store.state.gameSelected.gameRegion = gameInfo.value.gameRegions[sel]._id
      store.state.gameSelected.gameVersion = gameInfo.value.gameRegions[sel].gameVersions[versionIndex.value]._id
      // Update game store path.
      setGamePath(gameInfo.value.platform._id + '/' + gameInfo.value._id + '/games/' + gameInfo.value.gameRegions[sel]._id)
    }
    const nextRegion = () => {
      if (regionIndex.value < gameInfo.value.gameRegions.length - 1) {
        // Set sliding transition orientation.
        slideBack.value = false
        // Increase region index.
        regionIndex.value++
      }
    }
    const prevRegion = () => {
      if (regionIndex.value > 0) {
        // Set sliding transition orientation.
        slideBack.value = true
        // Decrease region index.
        regionIndex.value--
      }
    }
    const setGameRegion = () => {
      // Set the currently selected region as the default.
      selectGameRegion(gameInfo.value, regionIndex.value)
        .then(() => {
          // Reload game.
          loadGame()
          // Reset region index.
          regionIndex.value = 0
          // Reset version index.
          versionIndex.value = 0
        })
    }

    // Manage playlists operations.
    let managePlaylistsDialog = ref(false)
    const managePlaylistsOpen = () => {
      // Restore the data on the store.
      store.commit('resetPlaylistForm')
      // Open create dialog.
      managePlaylistsDialog.value = !managePlaylistsDialog.value
    }
    const managePlaylistsClose = () => {
      // Close create dialog.
      managePlaylistsDialog.value = !managePlaylistsDialog.value
    }

    // Manage game favorite state.
    let gameFavorited = ref(false)
    const addFavorite = () => {
      // Add current game to favorites.
      addFavorites(gameInfo.value._id)
        .then(() => { updateFavorite() })
    }
    const removeFavorite = () => {
      // Remove current game from favorites.
      removeFavorites(gameInfo.value._id)
        .then(() => { updateFavorite() })
    }
    const updateFavorite = () => {
      // Update favorited status for the current game.
      getFavorite(gameInfo.value._id)
        .then((res) => {
          gameFavorited.value = res
        })
    }

    // Return values to use on template.
    return {
      addFavorite,
      changeRegion,
      createPlatformClose,
      createPlatformDialog,
      createPlatformOpen,
      createRegionClose,
      createRegionDialog,
      createRegionOpen,
      createVersionClose,
      createVersionDialog,
      createVersionOpen,
      deletePlatformClose,
      deletePlatformDialog,
      deletePlatformOpen,
      deleteRegionClose,
      deleteRegionDialog,
      deleteRegionOpen,
      deleteVersionClose,
      deleteVersionDialog,
      deleteVersionOpen,
      editGameClose,
      editGameDialog,
      editGameOpen,
      fullTitle,
      gameFavorited,
      gameInfo,
      loadLinks,
      managePlaylistsClose,
      managePlaylistsDialog,
      managePlaylistsOpen,
      openGamePath,
      openImagesPath,
      openStorePath,
      regionIndex,
      removeFavorite,
      setGameRegion,
      slideBack,
      versionIndex,
    }
  }
}
</script>

<style scoped>
/* Calculations. */
.h-content {
  height: calc(100vh - 6.25rem);
}
.min-h-content {
  min-height: calc(100vh - 9.25rem);
}
.max-h-content {
  max-height: calc(100vh - 9.25rem);
}
</style>