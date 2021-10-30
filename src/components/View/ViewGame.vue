<template>
  <div>
    <div v-if="$store.getters.getSettingsGeneralEditMode">
      <!-- Create game platform dialog. -->
      <create-game-platform
        v-show="createPlatformDialog"
        @close="createPlatformClose($event)"
      />
      <!-- Create game region dialog. -->
      <create-game-region
        v-show="createRegionDialog"
        @close="createRegionClose($event)"
      />
      <!-- Create game version dialog. -->
      <create-game-version
        v-show="createVersionDialog"
        @close="createVersionClose($event)"
      />
      <!-- Edit game dialog. -->
      <edit-game
        v-show="editGameDialog"
        :gameDeveloper="gameInfo.developer._id"
        :gamePlatform="gameInfo.platform._id"
        @close="editGameClose($event)"
      />
      <!-- Delete game platform dialog. -->
      <vi-dialog-box
        v-show="deletePlatformDialog"
        @accept="deletePlatformClose()"
        @cancel="deletePlatformOpen()"
        actions="OkCancel"
      >
        Delete game <b>'{{ fullTitle }}'</b> ?
        <br />
        It will also delete all its regions and versions.
      </vi-dialog-box>
      <!-- Delete game region dialog. -->
      <vi-dialog-box
        v-show="deleteRegionDialog"
        @accept="deleteRegionClose()"
        @cancel="deleteRegionOpen()"
        actions="OkCancel"
      >
        Delete region <b>'{{ gameInfo.gameRegions[regionIndex].regionName }}'</b>
        from game <b>'{{ fullTitle }}'</b> ?
        <br />
        It will also delete all its versions.
      </vi-dialog-box>
      <!-- Delete game version dialog. -->
      <vi-dialog-box
        v-show="deleteVersionDialog"
        @accept="deleteVersionClose()"
        @cancel="deleteVersionOpen()"
        actions="OkCancel"
      >
        Delete the selected version from game <b>'{{ fullTitle }}'</b> ?
        <br />
        If it's the only version, it will also delete the region.
      </vi-dialog-box>
    </div>
    <!-- Playlists management dialog. -->
    <view-game-playlists
      v-show="managePlaylistsDialog"
      @close="managePlaylistsClose()"
    />
    <!-- Navigation bar. -->
    <vi-nav-bar :class="$store.getters.getSettingsGeneralEditMode ? 'mr-1' : 'mx-1'">
      <div
        v-if="$store.getters.getSettingsGeneralEditMode"
        class="flex"
      >
        <!-- Create games menu dialog. -->
        <vi-menu-select icon="icon-add">
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
        <vi-button-nb @click="editGameOpen()">
          <vi-icon class="w-6">
            <icon-edit />
          </vi-icon>
        </vi-button-nb>
        <!-- Delete games menu dialog. -->
        <vi-menu-select icon="icon-remove">
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
        <vi-menu-select icon="icon-folder">
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
        <vi-button-nb @click="setGameRegion()">
          <vi-icon class="w-6">
            <icon-pin />
          </vi-icon>
        </vi-button-nb>
      </div>
      <!-- Game region tabs. -->
      <ul class="flex h-full w-full">
        <li
          v-for="(region, index) in gameInfo.gameRegions"
          :key="region._id"
          :value="region._id"
          class="h-full relative w-full"
        >
          <!-- Region tab button. -->
          <div
            class="cursor-pointer duration-500 h-full relative w-full"
            :class="index == regionIndex ? 'border-b-4 border-color-400' : ''"
          >
            <div
              class="absolute duration-500 h-full top-0 w-full"
              :class="index == regionIndex ? 'bg-color-500 opacity-50' : 'bg-theme-200 dark:bg-theme-900'"
            />
            <div class="h-full inline-flex items-center relative text-lg w-full">
              <p :class="gameInfo.gameRegions[index].region && minimalUiDisplayRegionFlags ? 'ml-auto' : 'mx-auto'">
                {{ gameInfo.gameRegions[index].title }}
              </p>
              <img
                v-if="minimalUiDisplayRegionFlags && gameInfo.gameRegions[index].region"
                :src="'./images/flags/' + gameInfo.gameRegions[index].region + '.svg'"
                class="h-full ml-auto p-4"
              />
            </div>
          </div>
          <div
            @click="changeRegion(index)"
            class="absolute bg-theme-800 dark:bg-theme-200 cursor-pointer duration-500 h-full opacity-0 hover:opacity-10 top-0 w-full"
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
          class="flex flex-col max-h-content min-h-content overflow-hidden"
        >
          <div class="flex-1 no-scrollbar overflow-y-scroll p-1">
            <div
              ref="coverImage"
              class="flex h-full max-h-content relative w-full"
            >
              <!-- View game page background. -->
              <view-game-background
                :key="gameInfo"
                :gameInfo="gameInfo"
                :regionIndex="regionIndex"
                :versionIndex="versionIndex"
              >
                <div class="flex h-full">
                  <div class="flex flex-col max-w-1/2">
                    <!-- Top container. -->
                    <div class="flex mr-auto p-6 space-x-2 text-theme-100">
                      <!-- Game settings. -->
                      <settings-game />
                      <div class="flex space-x-2">
                        <!-- Open game playlists management dialog. -->
                        <button
                          v-if="minimalUiDisplayPlaylists"
                          @click="managePlaylistsClose()"
                          class="duration-200 -mb-1 pl-0.5 opacity-60 hover:opacity-80 hover:scale-110 transform"
                        >
                          <vi-icon
                            icon-shadow
                            class="w-8"
                          >
                            <icon-playlist-add />
                          </vi-icon>
                        </button>
                        <!-- Remove selected game platform from favorites. -->
                        <button
                          v-if="minimalUiDisplayFavorites && gameFavorited"
                          @click="removeFavorite()"
                          class="duration-200 opacity-60 hover:opacity-80 hover:scale-110 transform"
                        >
                          <vi-icon class="icon-shadow w-6">
                            <icon-star-f />
                          </vi-icon>
                        </button>
                        <!-- Add selected game platform to favorites. -->
                        <button
                          v-else-if="minimalUiDisplayFavorites"
                          @click="addFavorite()"
                          class="duration-200 opacity-60 hover:opacity-80 hover:scale-110 transform"
                        >
                          <vi-icon class="icon-shadow w-6">
                            <icon-star />
                          </vi-icon>
                        </button>
                      </div>
                    </div>
                    <!-- Bottom container. -->
                    <div class="mt-auto p-8 pb-0 space-y-2">
                      <!-- View game launching elements. -->
                      <view-game-launcher
                        :key="gameInfo"
                        :gameInfo="gameInfo"
                        :regionIndex="regionIndex"
                        @updated="versionIndex = $event"
                      />
                      <div
                        v-if="minimalUiDisplayDetails && minimalUiDisplayGameLinking && minimalUiDisplayLinks && minimalUiDisplayGallery"
                        class="flex space-x-2 w-full"
                      >
                        <!-- View game details. -->
                        <view-game-details
                          v-if="minimalUiDisplayDetails"
                          :key="gameInfo"
                          :fullTitle="fullTitle"
                          :gameInfo="gameInfo"
                          :regionIndex="regionIndex"
                          :versionIndex="versionIndex"
                        />
                        <!-- View game linking. -->
                        <view-game-linking
                          v-if="minimalUiDisplayGameLinking"
                          :key="gameInfo"
                          :gameInfo="gameInfo"
                          :regionIndex="regionIndex"
                        />
                        <!-- View game links. -->
                        <view-game-links
                          v-show="minimalUiDisplayLinks"
                          :key="gameInfo"
                          :fullTitle="fullTitle"
                          :gameInfo="gameInfo"
                          :gameRegion="gameInfo.gameRegions[regionIndex]"
                          @loaded="loadLinks($event)"
                        />
                        <!-- View game gallery. -->
                        <view-game-gallery
                          v-if="minimalUiDisplayGallery"
                          :key="gameInfo"
                          :gameInfo="gameInfo"
                          :regionIndex="regionIndex"
                          :versionIndex="versionIndex"
                        />
                      </div>
                      <!-- View game tags. -->
                      <div
                        v-if="minimalUiDisplayGameTags && gameInfo.gameTags.length > 0"
                        class="flex flex-wrap"
                      >
                        <vi-chip-ui
                          v-for="tag in gameInfo.gameTags"
                          :key="tag._id"
                          @clicked="$router.push({ name: 'Tag', params: { id: tag._id } })"
                          class="mb-0.5 mr-0.5"
                        >
                          {{ tag.name }}
                        </vi-chip-ui>
                      </div>
                    </div>
                  </div>
                  <!-- View game cover image. -->
                  <view-game-cover
                    :key="gameInfo"
                    :gameInfo="gameInfo"
                    :regionIndex="regionIndex"
                    :versionIndex="versionIndex"
                    :coverHeight="coverHeight"
                  />
                </div>
                <div
                  ref="gameContent"
                  class="flex flex-col mt-auto p-8"
                >
                  <!-- View game information. -->
                  <view-game-info
                    :key="gameInfo"
                    :gameInfo="gameInfo"
                    :regionIndex="regionIndex"
                    :versionIndex="versionIndex"
                  />
                </div>
              </view-game-background>
            </div>
          </div>
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
import SettingsGame from '@/components/Settings/SettingsGame.vue'
// Import game page components.
import ViewGameBackground from './ViewGame/ViewGameBackground.vue'
import ViewGameCover from './ViewGame/ViewGameCover.vue'
import ViewGameDetails from './ViewGame/ViewGameDetails.vue'
import ViewGameGallery from './ViewGame/ViewGameGallery.vue'
import ViewGameInfo from './ViewGame/ViewGameInfo.vue'
import ViewGameLauncher from './ViewGame/ViewGameLauncher.vue'
import ViewGameLinking from './ViewGame/ViewGameLinking.vue'
import ViewGameLinks from './ViewGame/ViewGameLinks.vue'
import ViewGamePlaylists from './ViewGame/ViewGamePlaylists.vue'

export default {
  name: 'ViewGame',
  components: {
    CreateGamePlatform,
    CreateGameRegion,
    CreateGameVersion,
    EditGame,
    SettingsGame,
    ViewGameBackground,
    ViewGameCover,
    ViewGameDetails,
    ViewGameGallery,
    ViewGameInfo,
    ViewGameLauncher,
    ViewGameLinking,
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
      gameTags: [],
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
          store.commit('setPlatformOverStore')
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
    const editGameClose = (edited) => {
      // Reload game.
      if (edited) { loadGame() }
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
    const createPlatformClose = (created) => {
      // Reload game.
      if (created) { loadGame() }
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
    const createRegionClose = (created) => {
      // Reload game.
      if (created) { loadGame() }
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
    const createVersionClose = (created) => {
      // Reload game.
      if (created) { loadGame() }
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

    // Manage image load and resizing.
    const coverImage = ref(null)
    const gameContent = ref(null)
    const coverHeight = () => {
      if (coverImage.value && gameContent.value) {
        return coverImage.value.clientHeight - gameContent.value.clientHeight
      }
    }

    // Manage minimal UI state.
    const minimalUiDisplay = computed(() => {
      return !store.getters.getSettingsGameMinimalUiDisplay
    })
    const minimalUiDisplayPlaylists = computed(() => {
      if (!minimalUiDisplay.value) {
        return !store.getters.getSettingsGameMinimalUiDisplayPlaylists
      } else { return true }
    })
    const minimalUiDisplayFavorites = computed(() => {
      if (!minimalUiDisplay.value) {
        return !store.getters.getSettingsGameMinimalUiDisplayFavorites
      } else { return true }
    })
    const minimalUiDisplayDetails = computed(() => {
      if (!minimalUiDisplay.value) {
        return !store.getters.getSettingsGameMinimalUiDisplayDetails
      } else { return true }
    })
    const minimalUiDisplayGameLinking = computed(() => {
      if (!minimalUiDisplay.value) {
        return !store.getters.getSettingsGameMinimalUiDisplayGameLinking
      } else { return true }
    })
    const minimalUiDisplayLinks = computed(() => {
      if (!minimalUiDisplay.value) {
        return !store.getters.getSettingsGameMinimalUiDisplayLinks
      } else { return true }
    })
    const minimalUiDisplayGallery = computed(() => {
      if (!minimalUiDisplay.value) {
        return !store.getters.getSettingsGameMinimalUiDisplayGallery
      } else { return true }
    })
    const minimalUiDisplayGameTags = computed(() => {
      if (!minimalUiDisplay.value) {
        return !store.getters.getSettingsGameMinimalUiDisplayGameTags
      } else { return true }
    })
    const minimalUiDisplayRegionFlags = computed(() => {
      if (!minimalUiDisplay.value) {
        return !store.getters.getSettingsGameMinimalUiDisplayRegionFlags
      } else { return true }
    })

    // Return values to use on template.
    return {
      addFavorite,
      changeRegion,
      coverHeight,
      coverImage,
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
      gameContent,
      gameFavorited,
      gameInfo,
      loadLinks,
      managePlaylistsClose,
      managePlaylistsDialog,
      managePlaylistsOpen,
      minimalUiDisplayDetails,
      minimalUiDisplayFavorites,
      minimalUiDisplayGallery,
      minimalUiDisplayGameLinking,
      minimalUiDisplayGameTags,
      minimalUiDisplayLinks,
      minimalUiDisplayPlaylists,
      minimalUiDisplayRegionFlags,
      openGamePath,
      openImagesPath,
      openStorePath,
      regionIndex,
      removeFavorite,
      setGameRegion,
      slideBack,
      versionIndex
    }
  }
}
</script>

<style lang="postcss" scoped>
/* Calculations. */
.min-h-content {
  min-height: calc(100vh - 3.5rem);
}
.max-h-content {
  max-height: calc(100vh - 3.5rem);
}
</style>