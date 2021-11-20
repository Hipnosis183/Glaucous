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
        :game-reset="editGameDialog"
        :game-developer="gameInfo.developer._id"
        :game-platform="gameInfo.platform._id"
        @close="editGameClose($event)"
      />
      <!-- Delete game platform dialog. -->
      <vi-dialog-box
        v-show="deletePlatformDialog"
        @accept="deletePlatformClose()"
        @cancel="deletePlatformOpen()"
        dialog-actions="OkCancel"
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
        dialog-actions="OkCancel"
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
        dialog-actions="OkCancel"
      >
        Delete the selected version from game <b>'{{ fullTitle }}'</b> ?
        <br />
        If it's the only version, it will also delete the region.
      </vi-dialog-box>
      <!-- Open game directories dialog. -->
      <vi-dialog
        v-show="dataPathDialog"
        @close="dataPathShow()"
        class="z-10"
      >
        <!-- Padding. -->
        <div class="w-80" />
        <!-- Header. -->
        <div class="flex justify-between mb-6 mx-2">
          <!-- Title. -->
          <p class="mr-10 pt-1 text-2xl">Directories</p>
          <!-- Buttons. -->
          <vi-button
            button-icon="icon-close"
            @click="dataPathShow()"
          />
        </div>
        <!-- Separator. -->
        <div class="bg-theme-200 dark:bg-theme-600 h-0.5 my-5 w-full" />
        <!-- Open directories buttons. -->
        <div class="flex flex-col space-y-4">
          <vi-button
            button-large
            @click="openPathGame()"
          >Open Game Folder</vi-button>
          <vi-button
            button-large
            @click="openPathConfig()"
          >Open Configuration Folder</vi-button>
          <vi-button
            button-large
            @click="openPathFiles()"
          >Open Files Folder</vi-button>
          <vi-button
            button-large
            @click="openPathImages()"
          >Open Images Folder</vi-button>
          <vi-button
            button-large
            @click="openPathLinks()"
          >Open Links Folder</vi-button>
        </div>
      </vi-dialog>
    </div>
    <!-- Navigation bar. -->
    <vi-nav-bar :class="{ 'mx-1' : !$store.getters.getSettingsGeneralEditMode }">
      <div
        v-if="$store.getters.getSettingsGeneralEditMode"
        class="bg-theme-200 dark:bg-theme-900 flex items-center px-2 space-x-1"
      >
        <!-- Create games menu dialog. -->
        <vi-menu-select
          menu-icon="icon-add"
          :menu-offset="[0, 14]"
        >
          <!-- Open create game platform dialog. -->
          <vi-menu-option
            menu-label="Create Game Platform"
            :menu-method="createPlatformOpen"
          />
          <!-- Open create game region dialog. -->
          <vi-menu-option
            menu-label="Create Game Region"
            :menu-method="createRegionOpen"
          />
          <!-- Open create game version dialog. -->
          <vi-menu-option
            menu-label="Create Game Version"
            :menu-method="createVersionOpen"
          />
        </vi-menu-select>
        <!-- Open edit game dialog. -->
        <vi-button-nb
          button-icon="icon-edit"
          @click="editGameOpen()"
        />
        <!-- Delete games menu dialog. -->
        <vi-menu-select
          menu-icon="icon-remove"
          :menu-offset="[0, 14]"
        >
          <!-- Open create game platform dialog. -->
          <vi-menu-option
            menu-label="Delete Game Platform"
            :menu-method="deletePlatformOpen"
          />
          <!-- Open create game region dialog. -->
          <vi-menu-option
            menu-label="Delete Game Region"
            :menu-method="deleteRegionOpen"
          />
          <!-- Open create game version dialog. -->
          <vi-menu-option
            menu-label="Delete Game Version"
            :menu-method="deleteVersionOpen"
          />
        </vi-menu-select>
        <!-- Select default games. -->
        <vi-menu-select
          menu-icon="icon-pin"
          :menu-offset="[0, 14]"
        >
          <!-- Set selected region as the main region. -->
          <vi-menu-option
            menu-label="Set Region as Default"
            :menu-method="setGameRegion"
          />
          <!-- Set selected version as the main version. -->
          <vi-menu-option
            menu-label="Set Version as Default"
            :menu-method="setGameVersion"
          />
        </vi-menu-select>
        <!-- Open game directories dialog. -->
        <vi-menu-select
          menu-icon="icon-folder"
          :menu-offset="[0, 14]"
        >
          <!-- Open game platform directories menu dialog. -->
          <vi-menu-option
            menu-label="Platform Directories"
            :menu-method="directoriesPlatform"
          />
          <!-- Open game region directories menu dialog. -->
          <vi-menu-option
            menu-label="Region Directories"
            :menu-method="directoriesRegion"
          />
          <!-- Open game version directories menu dialog. -->
          <vi-menu-option
            menu-label="Version Directories"
            :menu-method="directoriesVersion"
          />
        </vi-menu-select>
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
            class="border-transparent cursor-pointer duration-500 h-full relative transition-colors w-full"
            :class="index == regionIndex ? 'border-b-4 border-color-400 dark:border-color-500' : ''"
          >
            <div
              class="absolute duration-500 h-full top-0 w-full"
              :class="index == regionIndex ? 'bg-color-500 dark:bg-color-600 opacity-50' : 'bg-theme-200 dark:bg-theme-900'"
            />
            <div class="h-full inline-flex items-center relative text-lg w-full">
              <p :class="hideElementsRegionFlags && gameInfo.gameRegions[index].region ? 'ml-auto' : 'mx-auto'">
                {{ gameInfo.gameRegions[index].title }}
              </p>
              <div
                v-if="hideElementsRegionFlags && gameInfo.gameRegions[index].region"
                class="flex h-full ml-auto p-4"
              >
                <img
                  :src="'./images/flags/' + gameInfo.gameRegions[index].region + '.svg'"
                  class="rounded"
                  :class="index == regionIndex ? 'opacity-90' : 'opacity-80'"
                />
              </div>
            </div>
          </div>
          <div
            @click="changeRegion(index)"
            class="absolute bg-color-400 cursor-pointer duration-500 h-full opacity-0 hover:opacity-20 top-0 w-full"
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
                :game-info="gameInfo"
                :region-index="regionIndex"
                :version-index="versionIndex"
              >
                <div class="flex h-full">
                  <div class="flex flex-col max-w-1/2">
                    <!-- Top container. -->
                    <div class="flex mr-auto p-6 text-theme-100">
                      <!-- View game details. -->
                      <view-game-details
                        v-show="gameDetailsDialog"
                        @close="gameDetailsShow()"
                        :key="gameInfo"
                        :full-title="fullTitle"
                        :game-info="gameInfo"
                        :region-index="regionIndex"
                        :version-index="versionIndex"
                      />
                      <!-- View game files. -->
                      <view-game-files
                        v-show="gameFilesDialog"
                        @close="gameFilesShow()"
                        :key="gameInfo"
                        :game-info="gameInfo"
                        :region-index="regionIndex"
                        :version-index="versionIndex"
                      />
                      <!-- View game gallery. -->
                      <view-game-gallery
                        v-show="gameGalleryDialog"
                        @close="gameGalleryShow()"
                        :key="gameInfo"
                        :gallery-show="gameGalleryDialog"
                        :game-info="gameInfo"
                        :region-index="regionIndex"
                        :version-index="versionIndex"
                      />
                      <!-- View game links. -->
                      <view-game-links
                        v-show="gameLinksDialog"
                        @close="gameLinksShow()"
                        :key="gameInfo"
                        :full-title="fullTitle"
                        :game-info="gameInfo"
                        :region-index="regionIndex"
                        :version-index="versionIndex"
                      />
                      <!-- View game notes. -->
                      <view-game-notes
                        v-show="gameNotesDialog"
                        @close="gameNotesShow()"
                        :key="gameInfo"
                        :game-info="gameInfo"
                        :region-index="regionIndex"
                        :version-index="versionIndex"
                      />
                      <!-- View playlists management. -->
                      <view-game-playlists
                        v-show="gamePlaylistsDialog"
                        @close="gamePlaylistsClose()"
                      />
                      <!-- View game page settings. -->
                      <settings-games
                        v-show="gameSettingsDialog"
                        @close="gameSettingsShow()"
                      />
                      <!-- Buttons. -->
                      <vi-menu-select-ui
                        menu-icon="icon-grid"
                        class="ml-2 mr-1"
                      >
                        <div class="flex">
                          <div>
                            <!-- Open game details dialog. -->
                            <vi-menu-option-ui
                              menu-icon="icon-info"
                              menu-label="Details"
                              :menu-method="gameDetailsShow"
                            />
                            <!-- Remove selected game platform from favorites. -->
                            <vi-menu-option-ui
                              v-if="gameFavorited"
                              menu-icon="icon-star-s"
                              menu-label="Favorited"
                              :menu-method="removeFavorite"
                              menu-small
                            />
                            <!-- Add selected game platform to favorites. -->
                            <vi-menu-option-ui
                              v-else
                              menu-icon="icon-star"
                              menu-label="Favorite"
                              :menu-method="addFavorite"
                              menu-small
                            />
                            <!-- Open files dialog. -->
                            <vi-menu-option-ui
                              menu-icon="icon-clip"
                              menu-label="Files"
                              :menu-method="gameFilesShow"
                            />
                            <!-- Open game gallery. -->
                            <vi-menu-option-ui
                              menu-icon="icon-picture-s"
                              menu-label="Gallery"
                              :menu-method="gameGalleryShow"
                            />
                          </div>
                          <div>
                            <!-- Open links dialog. -->
                            <vi-menu-option-ui
                              menu-icon="icon-link"
                              menu-label="Links"
                              :menu-method="gameLinksShow"
                            />
                            <!-- Open notes dialog. -->
                            <vi-menu-option-ui
                              menu-icon="icon-notes"
                              menu-label="Notes"
                              :menu-method="gameNotesShow"
                            />
                            <!-- Open playlists dialog. -->
                            <vi-menu-option-ui
                              menu-icon="icon-playlist-add"
                              menu-label="Playlists"
                              :menu-method="gamePlaylistsOpen"
                            />
                            <!-- Open settings dialog. -->
                            <vi-menu-option-ui
                              menu-icon="icon-options"
                              menu-label="Settings"
                              :menu-method="gameSettingsShow"
                            />
                          </div>
                        </div>
                      </vi-menu-select-ui>
                      <!-- Remove selected game platform from favorites. -->
                      <vi-button-ui
                        v-if="gameFavorited"
                        @click="removeFavorite()"
                        button-small
                        class="mr-1 rounded-xl"
                      >
                        <vi-icon class="p-px w-6">
                          <icon-star-s />
                        </vi-icon>
                      </vi-button-ui>
                      <!-- Add selected game platform to favorites. -->
                      <vi-button-ui
                        v-else-if="hideElementsFavorite"
                        @click="addFavorite()"
                        button-small
                        class="mr-1 rounded-xl"
                      >
                        <vi-icon class="p-px w-6">
                          <icon-star />
                        </vi-icon>
                      </vi-button-ui>
                      <!-- Open game details dialog. -->
                      <vi-button-ui
                        v-if="hideElementsDetails"
                        @click="gameDetailsShow()"
                        button-small
                        class="mr-1 rounded-xl"
                      >
                        <vi-icon class="p-px w-6">
                          <icon-info />
                        </vi-icon>
                      </vi-button-ui>
                      <!-- Open files dialog. -->
                      <vi-button-ui
                        v-if="hideElementsFiles"
                        @click="gameFilesShow()"
                        button-small
                        class="mr-1 rounded-xl"
                      >
                        <vi-icon class="p-px w-6">
                          <icon-clip />
                        </vi-icon>
                      </vi-button-ui>
                      <!-- Open game gallery. -->
                      <vi-button-ui
                        v-if="hideElementsGallery"
                        @click="gameGalleryShow()"
                        button-small
                        class="mr-1 rounded-xl"
                      >
                        <vi-icon class="p-px w-6">
                          <icon-picture-s />
                        </vi-icon>
                      </vi-button-ui>
                      <!-- Open links dialog. -->
                      <vi-button-ui
                        v-if="hideElementsLinks"
                        @click="gameLinksShow()"
                        button-small
                        class="mr-1 rounded-xl"
                      >
                        <vi-icon class="p-px w-6">
                          <icon-link />
                        </vi-icon>
                      </vi-button-ui>
                      <!-- Open notes dialog. -->
                      <vi-button-ui
                        v-if="hideElementsNotes"
                        @click="gameNotesShow()"
                        button-small
                        class="mr-1 rounded-xl"
                      >
                        <vi-icon class="p-px w-6">
                          <icon-notes />
                        </vi-icon>
                      </vi-button-ui>
                      <!-- Open playlists dialog. -->
                      <vi-button-ui
                        v-if="hideElementsPlaylists"
                        @click="gamePlaylistsOpen()"
                        button-small
                        class="mr-1 rounded-xl"
                      >
                        <vi-icon class="p-px w-6">
                          <icon-playlist-add />
                        </vi-icon>
                      </vi-button-ui>
                      <!-- Open settings dialog. -->
                      <vi-button-ui
                        v-if="hideElementsSettingsPage"
                        @click="gameSettingsShow()"
                        button-small
                        class="mr-1 rounded-xl"
                      >
                        <vi-icon class="p-px w-6">
                          <icon-options-sm />
                        </vi-icon>
                      </vi-button-ui>
                    </div>
                    <!-- Bottom container. -->
                    <div class="mt-auto p-8 pb-0">
                      <!-- View game launching elements. -->
                      <view-game-launcher
                        :key="gameInfo"
                        :game-info="gameInfo"
                        :region-index="regionIndex"
                        @updated="versionIndex = $event"
                      />
                    </div>
                  </div>
                  <!-- View game cover image. -->
                  <view-game-cover
                    :key="gameInfo"
                    :game-info="gameInfo"
                    :region-index="regionIndex"
                    :version-index="versionIndex"
                    :cover-height="coverHeight"
                  />
                </div>
                <div
                  ref="gameContent"
                  class="flex flex-col mt-auto p-8"
                >
                  <!-- View game information. -->
                  <view-game-info
                    :key="gameInfo"
                    :game-info="gameInfo"
                    :region-index="regionIndex"
                    :version-index="versionIndex"
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
import { ensureDirSync } from 'fs-extra'
// Import database controllers functions.
import { getGame, deleteGamePlatform, deleteGameRegion, deleteGameVersion, selectGameRegion, selectGameVersion } from '@/database/controllers/Game'
import { addFavorites, getFavorite, removeFavorites } from '@/database/controllers/User'
// Import form components.
import CreateGamePlatform from '@/components/Create/CreateGamePlatform.vue'
import CreateGameRegion from '@/components/Create/CreateGameRegion.vue'
import CreateGameVersion from '@/components/Create/CreateGameVersion.vue'
import EditGame from '@/components/Edit/EditGame.vue'
import SettingsGames from '@/components/Settings/SettingsGames.vue'
// Import game page components.
import ViewGameBackground from './ViewGame/ViewGameBackground.vue'
import ViewGameCover from './ViewGame/ViewGameCover.vue'
import ViewGameDetails from './ViewGame/ViewGameDetails.vue'
import ViewGameFiles from './ViewGame/ViewGameFiles.vue'
import ViewGameGallery from './ViewGame/ViewGameGallery.vue'
import ViewGameInfo from './ViewGame/ViewGameInfo.vue'
import ViewGameLauncher from './ViewGame/ViewGameLauncher.vue'
import ViewGameLinks from './ViewGame/ViewGameLinks.vue'
import ViewGameNotes from './ViewGame/ViewGameNotes.vue'
import ViewGamePlaylists from './ViewGame/ViewGamePlaylists.vue'

export default {
  name: 'ViewGame',
  components: {
    CreateGamePlatform,
    CreateGameRegion,
    CreateGameVersion,
    EditGame,
    SettingsGames,
    ViewGameBackground,
    ViewGameCover,
    ViewGameDetails,
    ViewGameFiles,
    ViewGameGallery,
    ViewGameInfo,
    ViewGameLauncher,
    ViewGameLinks,
    ViewGameNotes,
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
      notes: [],
      files: [],
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
        notes: [],
        files: [],
        links: [],
        gameVersions: [{
          type: null,
          name: null,
          number: null,
          notes: [],
          files: [],
          links: []
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
          // Set initial favorited status.
          updateFavorite()
        })
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
    let basePath = app.getAppPath() + '/data'
    const basePathConfig = computed(() => { return '/config/' + gameInfo.value.platform._id })
    const basePathFiles = computed(() => { return '/files/' + gameInfo.value.platform._id })
    const basePathImages = computed(() => { return '/images/' + gameInfo.value.platform._id })
    const basePathLinks = computed(() => { return '/links/' + gameInfo.value.platform._id })
    const basePathPlatform = computed(() => { return '/' + gameInfo.value._id })
    const basePathRegion = computed(() => { return '/' + gameInfo.value.gameRegions[regionIndex.value]._id })
    const basePathVersion = computed(() => { return '/' + gameInfo.value.gameRegions[regionIndex.value].gameVersions[versionIndex.value]._id })
    let dataPathConfig = ref('')
    let dataPathFiles = ref('')
    let dataPathImages = ref('')
    let dataPathLinks = ref('')
    const directoriesPlatform = () => {
      dataPathConfig.value = basePathConfig.value + basePathPlatform.value
      dataPathFiles.value = basePathFiles.value + basePathPlatform.value
      dataPathImages.value = basePathImages.value + basePathPlatform.value
      dataPathLinks.value = basePathLinks.value + basePathPlatform.value
      dataPathDialog.value = true
    }
    const directoriesRegion = () => {
      dataPathConfig.value = basePathConfig.value + basePathPlatform.value + basePathRegion.value
      dataPathFiles.value = basePathFiles.value + basePathPlatform.value + basePathRegion.value
      dataPathImages.value = basePathImages.value + basePathPlatform.value + basePathRegion.value
      dataPathLinks.value = basePathLinks.value + basePathPlatform.value + basePathRegion.value
      dataPathDialog.value = true
    }
    const directoriesVersion = () => {
      dataPathConfig.value = basePathConfig.value + basePathPlatform.value + basePathRegion.value + basePathVersion.value
      dataPathFiles.value = basePathFiles.value + basePathPlatform.value + basePathRegion.value + basePathVersion.value
      dataPathImages.value = basePathImages.value + basePathPlatform.value + basePathRegion.value + basePathVersion.value
      dataPathLinks.value = basePathLinks.value + basePathPlatform.value + basePathRegion.value + basePathVersion.value
      dataPathDialog.value = true
    }
    let dataPathDialog = ref(false)
    const dataPathShow = () => {
      // Open create dialog.
      dataPathDialog.value = !dataPathDialog.value
    }
    const openPathGame = () => {
      // Open game file location path in the file manager.
      shell.openPath((store.state.settingsGame.relativePath ? store.state.settingsPlatform.relativePath + '/' : '') + store.state.settingsGame.gamePath)
    }
    const openPathConfig = () => {
      ensureDirSync(basePath + dataPathConfig.value)
      // Open game configuration location path in the file manager.
      shell.openPath(basePath + dataPathConfig.value)
    }
    const openPathFiles = () => {
      ensureDirSync(basePath + dataPathFiles.value)
      // Open extra files location path in the file manager.
      shell.openPath(basePath + dataPathFiles.value)
    }
    const openPathImages = () => {
      ensureDirSync(basePath + dataPathImages.value)
      // Open images location path in the file manager.
      shell.openPath(basePath + dataPathImages.value)
    }
    const openPathLinks = () => {
      ensureDirSync(basePath + dataPathLinks.value)
      // Open links location path in the file manager.
      shell.openPath(basePath + dataPathLinks.value)
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

    // Manage default game selection.
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
    const setGameVersion = () => {
      // Set the currently selected version as the default.
      selectGameVersion(gameInfo.value.gameRegions[regionIndex.value], versionIndex.value)
        .then(() => {
          // Reload game.
          loadGame()
          // Reset version index.
          versionIndex.value = 0
        })
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

    // Manage game dialogs display.
    let gameDetailsDialog = ref(false)
    const gameDetailsShow = () => {
      // Toggle details dialog.
      gameDetailsDialog.value = !gameDetailsDialog.value
    }
    let gameFilesDialog = ref(false)
    const gameFilesShow = () => {
      // Toggle files dialog.
      gameFilesDialog.value = !gameFilesDialog.value
    }
    let gameGalleryDialog = ref(false)
    const gameGalleryShow = () => {
      // Toggle gallery display.
      gameGalleryDialog.value = !gameGalleryDialog.value
    }
    let gameLinksDialog = ref(false)
    const gameLinksShow = () => {
      // Toggle links dialog.
      gameLinksDialog.value = !gameLinksDialog.value
    }
    let gameNotesDialog = ref(false)
    const gameNotesShow = () => {
      // Toggle notes dialog.
      gameNotesDialog.value = !gameNotesDialog.value
    }
    let gamePlaylistsDialog = ref(false)
    const gamePlaylistsOpen = () => {
      // Restore the data on the store.
      store.commit('resetPlaylistForm')
      // Open playlists dialog.
      gamePlaylistsDialog.value = !gamePlaylistsDialog.value
    }
    const gamePlaylistsClose = () => {
      // Close playlists dialog.
      gamePlaylistsDialog.value = !gamePlaylistsDialog.value
    }
    let gameSettingsDialog = ref(false)
    const gameSettingsShow = () => {
      // Toggle settings dialog.
      gameSettingsDialog.value = !gameSettingsDialog.value
    }

    // Manage elements display state.
    const hideElementsDetails = computed(() => {
      return !store.getters.getSettingsGameHideElementsDetails
    })
    const hideElementsFavorite = computed(() => {
      return !store.getters.getSettingsGameHideElementsFavorite
    })
    const hideElementsFiles = computed(() => {
      return !store.getters.getSettingsGameHideElementsFiles
    })
    const hideElementsGallery = computed(() => {
      return !store.getters.getSettingsGameHideElementsGallery
    })
    const hideElementsLinks = computed(() => {
      return !store.getters.getSettingsGameHideElementsLinks
    })
    const hideElementsNotes = computed(() => {
      return !store.getters.getSettingsGameHideElementsNotes
    })
    const hideElementsPlaylists = computed(() => {
      return !store.getters.getSettingsGameHideElementsPlaylists
    })
    const hideElementsSettingsPage = computed(() => {
      return !store.getters.getSettingsGameHideElementsSettingsPage
    })
    const hideElementsRegionFlags = computed(() => {
      return !store.getters.getSettingsGameHideElementsRegionFlags
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
      dataPathConfig,
      dataPathDialog,
      dataPathImages,
      dataPathShow,
      deletePlatformClose,
      deletePlatformDialog,
      deletePlatformOpen,
      deleteRegionClose,
      deleteRegionDialog,
      deleteRegionOpen,
      deleteVersionClose,
      deleteVersionDialog,
      deleteVersionOpen,
      directoriesPlatform,
      directoriesRegion,
      directoriesVersion,
      editGameClose,
      editGameDialog,
      editGameOpen,
      fullTitle,
      gameContent,
      gameFavorited,
      gameInfo,
      gameDetailsDialog,
      gameDetailsShow,
      gameFilesDialog,
      gameFilesShow,
      gameGalleryDialog,
      gameGalleryShow,
      gameLinksDialog,
      gameLinksShow,
      gameNotesDialog,
      gameNotesShow,
      gamePlaylistsClose,
      gamePlaylistsDialog,
      gamePlaylistsOpen,
      gameSettingsDialog,
      gameSettingsShow,
      hideElementsDetails,
      hideElementsFavorite,
      hideElementsFiles,
      hideElementsGallery,
      hideElementsLinks,
      hideElementsNotes,
      hideElementsPlaylists,
      hideElementsRegionFlags,
      hideElementsSettingsPage,
      openPathConfig,
      openPathFiles,
      openPathGame,
      openPathImages,
      openPathLinks,
      regionIndex,
      removeFavorite,
      setGameRegion,
      setGameVersion,
      slideBack,
      versionIndex
    }
  }
}
</script>

<style scoped>
/* Calculations. */
.min-h-content {
  min-height: calc(100vh - 3.5rem);
}
.max-h-content {
  max-height: calc(100vh - 3.5rem);
}
</style>