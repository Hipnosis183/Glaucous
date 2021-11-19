import { app } from '@electron/remote'
import { createStore } from 'vuex'
import Store from 'electron-store'

// App settings store.
const localStore = new Store({ cwd: app.getAppPath(), name: 'viridian' })
// Platform settings store.
let platformStore
// Game settings store.
let gameStore
let gameOverStore

export default createStore({
  state: {
    slideBack: false,
    settingsApp: {
      settingsGeneral: {
        editMode: localStore.get('settingsGeneral.editMode', true),
        gameCategory: localStore.get('settingsGeneral.gameCategory', 0),
        groupsView: localStore.get('settingsGeneral.groupsView', true)
      },
      settingsThemes: {
        darkMode: localStore.get('settingsThemes.darkMode', false),
        selectedTheme: localStore.get('settingsThemes.selectedTheme', 0),
        selectedColor: localStore.get('settingsThemes.selectedColor', 0),
        selectedFont: localStore.get('settingsThemes.selectedFont', 'Poppins')
      },
      settingsLists: {
        scalingEffect: localStore.get('settingsLists.scalingEffect', true),
        contentSpacing: localStore.get('settingsLists.contentSpacing', true),
        cornersRounding: localStore.get('settingsLists.cornersRounding', 2),
        cardTextDisplay: localStore.get('settingsLists.cardTextDisplay', 0),
        cardTextStyle: localStore.get('settingsLists.cardTextStyle', 0),
        displayMode: localStore.get('settingsLists.displayMode', 1)
      },
      settingsPlatform: {
        settingsGlobal: {
          imagesDisplay: localStore.get('settingsPlatform.imagesDisplay', 1),
          gridColumns: localStore.get('settingsPlatform.gridColumns', 4),
          gridHeight: localStore.get('settingsPlatform.gridHeight', 200)
        },
        settingsOver: {
          imagesFiltering: true,
          imagesDisplay: 0,
          displayMode: 0,
          gridColumns: '4',
          gridHeight: '200'
        }
      },
      settingsGame: {
        settingsGlobal: {
          backgroundImage: localStore.get('settingsGame.backgroundImage', 1),
          backgroundPlacement: localStore.get('settingsGame.backgroundPlacement', 1),
          hideElements: {
            details: localStore.get('settingsGame.hideElements.details', true),
            favorite: localStore.get('settingsGame.hideElements.favorite', true),
            files: localStore.get('settingsGame.hideElements.files', true),
            gallery: localStore.get('settingsGame.hideElements.gallery', true),
            links: localStore.get('settingsGame.hideElements.links', true),
            notes: localStore.get('settingsGame.hideElements.notes', true),
            playlists: localStore.get('settingsGame.hideElements.playlists', true),
            settingsPage: localStore.get('settingsGame.hideElements.settingsPage', true),
            cover: localStore.get('settingsGame.hideElements.cover', false),
            launch: localStore.get('settingsGame.hideElements.launch', false),
            versions: localStore.get('settingsGame.hideElements.versions', false),
            linking: localStore.get('settingsGame.hideElements.linking', false),
            settingsGame: localStore.get('settingsGame.hideElements.settingsGame', false),
            regionFlags: localStore.get('settingsGame.hideElements.regionFlags', false),
            tags: localStore.get('settingsGame.hideElements.tags', false)
          }
        },
        settingsOver: {
          backgroundImage: 0,
          backgroundPlacement: 0,
          colorTheme: 'default'
        }
      },
      settingsImages: {
        scalingEffect: localStore.get('settingsImages.scalingEffect', true),
        contentSpacing: localStore.get('settingsImages.contentSpacing', true),
        cornersRounding: localStore.get('settingsImages.cornersRounding', 2),
        gridColumns: localStore.get('settingsImages.gridColumns', 4)
      }
    },
    selectedPlatform: null,
    settingsPlatform: {
      emulator: null,
      relativePath: null
    },
    settingsGame: {
      emulator: null,
      gamePath: null,
      gameFile: null,
      gameParams: null,
      relativePath: true
    },
    gameSelected: {
      gamePlatform: null,
      gameRegion: null,
      gameVersion: null
    },
    gameForm: {
      gamePlatform: {
        developer: null,
        platform: null,
        releaseYear: null,
        numberPlayers: null,
        gameTags: [],
        notes: [],
        links: [],
        files: {
          add: [],
          files: [],
          remove: []
        },
        images: {
          cover: {
            add: null,
            remove: false
          },
          background: {
            add: null,
            remove: false
          },
          pictures: {
            add: [],
            remove: []
          }
        }
      },
      gameRegion: {
        title: null,
        preTitle: null,
        subTitle: null,
        originalTitle: null,
        romanizedTitle: null,
        translatedTitle: null,
        region: null,
        serial: null,
        notes: [],
        links: [],
        files: {
          add: [],
          files: [],
          remove: []
        },
        images: {
          cover: {
            add: null,
            remove: false
          },
          background: {
            add: null,
            remove: false
          },
          pictures: {
            add: [],
            remove: []
          }
        }
      },
      gameVersion: {
        type: null,
        name: null,
        number: null,
        notes: [],
        links: [],
        files: {
          add: [],
          files: [],
          remove: []
        },
        images: {
          cover: {
            add: null,
            remove: false
          },
          background: {
            add: null,
            remove: false
          },
          pictures: {
            add: [],
            remove: []
          }
        }
      }
    },
    developerSelected: null,
    developerForm: {
      name: null
    },
    platformSelected: null,
    platformForm: {
      group: false,
      name: null,
      parent: null
    },
    emulatorForm: {
      id: null,
      name: null,
      path: null,
      file: null,
      params: null
    },
    playlistSelected: null,
    playlistForm: {
      name: null
    },
    tagSelected: null,
    tagForm: {
      name: null
    }
  },
  getters: {
    // App settings.
    getSettingsGeneralEditMode(state) {
      return state.settingsApp.settingsGeneral.editMode
    },
    getSettingsGeneralGameCategory(state) {
      return state.settingsApp.settingsGeneral.gameCategory
    },
    getSettingsGeneralGroupsView(state) {
      return state.settingsApp.settingsGeneral.groupsView
    },
    getSettingsThemesDarkMode(state) {
      return state.settingsApp.settingsThemes.darkMode
    },
    getSettingsThemesSelectedTheme(state) {
      return state.settingsApp.settingsThemes.selectedTheme
    },
    getSettingsThemesSelectedColor(state) {
      return state.settingsApp.settingsThemes.selectedColor
    },
    getSettingsThemesSelectedFont(state) {
      return state.settingsApp.settingsThemes.selectedFont
    },
    getSettingsListsScalingEffect(state) {
      return state.settingsApp.settingsLists.scalingEffect
    },
    getSettingsListsContentSpacing(state) {
      return state.settingsApp.settingsLists.contentSpacing
    },
    getSettingsListsCornersRounding(state) {
      return state.settingsApp.settingsLists.cornersRounding
    },
    getSettingsListsCardTextDisplay(state) {
      return state.settingsApp.settingsLists.cardTextDisplay
    },
    getSettingsListsCardTextStyle(state) {
      return state.settingsApp.settingsLists.cardTextStyle
    },
    getSettingsListsDisplayMode(state) {
      return state.settingsApp.settingsLists.displayMode
    },
    getSettingsPlatformImagesDisplay(state) {
      return state.settingsApp.settingsPlatform.settingsGlobal.imagesDisplay
    },
    getSettingsPlatformGridColumns(state) {
      return state.settingsApp.settingsPlatform.settingsGlobal.gridColumns
    },
    getSettingsPlatformGridHeight(state) {
      return state.settingsApp.settingsPlatform.settingsGlobal.gridHeight
    },
    getSettingsPlatformOverImagesFiltering(state) {
      return state.settingsApp.settingsPlatform.settingsOver.imagesFiltering
    },
    getSettingsPlatformOverImagesDisplay(state) {
      return state.settingsApp.settingsPlatform.settingsOver.imagesDisplay
    },
    getSettingsPlatformOverDisplayMode(state) {
      return state.settingsApp.settingsPlatform.settingsOver.displayMode
    },
    getSettingsPlatformOverGridColumns(state) {
      return state.settingsApp.settingsPlatform.settingsOver.gridColumns
    },
    getSettingsPlatformOverGridHeight(state) {
      return state.settingsApp.settingsPlatform.settingsOver.gridHeight
    },
    getSettingsGameHideElementsDetails(state) {
      return state.settingsApp.settingsGame.settingsGlobal.hideElements.details
    },
    getSettingsGameHideElementsFavorite(state) {
      return state.settingsApp.settingsGame.settingsGlobal.hideElements.favorite
    },
    getSettingsGameHideElementsGallery(state) {
      return state.settingsApp.settingsGame.settingsGlobal.hideElements.gallery
    },
    getSettingsGameHideElementsFiles(state) {
      return state.settingsApp.settingsGame.settingsGlobal.hideElements.files
    },
    getSettingsGameHideElementsLinks(state) {
      return state.settingsApp.settingsGame.settingsGlobal.hideElements.links
    },
    getSettingsGameHideElementsNotes(state) {
      return state.settingsApp.settingsGame.settingsGlobal.hideElements.notes
    },
    getSettingsGameHideElementsPlaylists(state) {
      return state.settingsApp.settingsGame.settingsGlobal.hideElements.playlists
    },
    getSettingsGameHideElementsSettingsPage(state) {
      return state.settingsApp.settingsGame.settingsGlobal.hideElements.settingsPage
    },
    getSettingsGameHideElementsCover(state) {
      return state.settingsApp.settingsGame.settingsGlobal.hideElements.cover
    },
    getSettingsGameHideElementsLaunch(state) {
      return state.settingsApp.settingsGame.settingsGlobal.hideElements.launch
    },
    getSettingsGameHideElementsVersions(state) {
      return state.settingsApp.settingsGame.settingsGlobal.hideElements.versions
    },
    getSettingsGameHideElementsLinking(state) {
      return state.settingsApp.settingsGame.settingsGlobal.hideElements.linking
    },
    getSettingsGameHideElementsSettingsGame(state) {
      return state.settingsApp.settingsGame.settingsGlobal.hideElements.settingsGame
    },
    getSettingsGameHideElementsRegionFlags(state) {
      return state.settingsApp.settingsGame.settingsGlobal.hideElements.regionFlags
    },
    getSettingsGameHideElementsTags(state) {
      return state.settingsApp.settingsGame.settingsGlobal.hideElements.tags
    },
    getSettingsGameBackgroundImage(state) {
      return state.settingsApp.settingsGame.settingsGlobal.backgroundImage
    },
    getSettingsGameBackgroundPlacement(state) {
      return state.settingsApp.settingsGame.settingsGlobal.backgroundPlacement
    },
    getSettingsGameOverBackgroundImage(state) {
      return state.settingsApp.settingsGame.settingsOver.backgroundImage
    },
    getSettingsGameOverBackgroundPlacement(state) {
      return state.settingsApp.settingsGame.settingsOver.backgroundPlacement
    },
    getSettingsGameOverColorTheme(state) {
      return state.settingsApp.settingsGame.settingsOver.colorTheme
    },
    getSettingsImagesScalingEffect(state) {
      return state.settingsApp.settingsImages.scalingEffect
    },
    getSettingsImagesContentSpacing(state) {
      return state.settingsApp.settingsImages.contentSpacing
    },
    getSettingsImagesCornersRounding(state) {
      return state.settingsApp.settingsImages.cornersRounding
    },
    getSettingsImagesGridColumns(state) {
      return state.settingsApp.settingsImages.gridColumns
    }
  },
  mutations: {
    // App settings.
    resetSettingsApp(state) {
      localStore.clear()
      state.settingsApp.settingsGeneral.editMode = localStore.get('settingsGeneral.editMode', true)
      state.settingsApp.settingsGeneral.groupsView = localStore.get('settingsGeneral.groupsView', true)
      state.settingsApp.settingsThemes.darkMode = localStore.get('settingsThemes.darkMode', false)
      state.settingsApp.settingsThemes.selectedTheme = localStore.get('settingsThemes.selectedTheme', 0)
      state.settingsApp.settingsThemes.selectedColor = localStore.get('settingsThemes.selectedColor', 0)
    },
    setSettingsGeneralEditMode(state) {
      state.settingsApp.settingsGeneral.editMode = !state.settingsApp.settingsGeneral.editMode
      localStore.set('settingsGeneral.editMode', state.settingsApp.settingsGeneral.editMode)
    },
    setSettingsGeneralGameCategory(state, data) {
      state.settingsApp.settingsGeneral.gameCategory = data
      localStore.set('settingsGeneral.gameCategory', state.settingsApp.settingsGeneral.gameCategory)
    },
    setSettingsGeneralGroupsView(state) {
      state.settingsApp.settingsGeneral.groupsView = !state.settingsApp.settingsGeneral.groupsView
      localStore.set('settingsGeneral.groupsView', state.settingsApp.settingsGeneral.groupsView)
    },
    setSettingsThemesDarkMode(state) {
      state.settingsApp.settingsThemes.darkMode = !state.settingsApp.settingsThemes.darkMode
      localStore.set('settingsThemes.darkMode', state.settingsApp.settingsThemes.darkMode)
    },
    setSettingsThemesSelectedTheme(state, data) {
      state.settingsApp.settingsThemes.selectedTheme = data
      localStore.set('settingsThemes.selectedTheme', state.settingsApp.settingsThemes.selectedTheme)
    },
    setSettingsThemesSelectedColor(state, data) {
      state.settingsApp.settingsThemes.selectedColor = data
      localStore.set('settingsThemes.selectedColor', state.settingsApp.settingsThemes.selectedColor)
    },
    setSettingsThemesSelectedFont(state, data) {
      state.settingsApp.settingsThemes.selectedFont = data
      localStore.set('settingsThemes.selectedFont', state.settingsApp.settingsThemes.selectedFont)
    },
    setSettingsListsScalingEffect(state, data) {
      state.settingsApp.settingsLists.scalingEffect = data
      localStore.set('settingsLists.scalingEffect', state.settingsApp.settingsLists.scalingEffect)
    },
    setSettingsListsContentSpacing(state, data) {
      state.settingsApp.settingsLists.contentSpacing = data
      localStore.set('settingsLists.contentSpacing', state.settingsApp.settingsLists.contentSpacing)
    },
    setSettingsListsCornersRounding(state, data) {
      state.settingsApp.settingsLists.cornersRounding = data
      localStore.set('settingsLists.cornersRounding', state.settingsApp.settingsLists.cornersRounding)
    },
    setSettingsListsCardTextDisplay(state, data) {
      state.settingsApp.settingsLists.cardTextDisplay = data
      localStore.set('settingsLists.cardTextDisplay', state.settingsApp.settingsLists.cardTextDisplay)
    },
    setSettingsListsCardTextStyle(state, data) {
      state.settingsApp.settingsLists.cardTextStyle = data
      localStore.set('settingsLists.cardTextStyle', state.settingsApp.settingsLists.cardTextStyle)
    },
    setSettingsListsDisplayMode(state, data) {
      state.settingsApp.settingsLists.displayMode = data
      localStore.set('settingsLists.displayMode', state.settingsApp.settingsLists.displayMode)
    },
    setSettingsPlatformImagesDisplay(state, data) {
      state.settingsApp.settingsPlatform.settingsGlobal.imagesDisplay = data
      localStore.set('settingsPlatform.imagesDisplay', state.settingsApp.settingsPlatform.settingsGlobal.imagesDisplay)
    },
    setSettingsPlatformGridColumns(state, data) {
      state.settingsApp.settingsPlatform.settingsGlobal.gridColumns = data
      localStore.set('settingsPlatform.gridColumns', state.settingsApp.settingsPlatform.settingsGlobal.gridColumns)
    },
    setSettingsPlatformGridHeight(state, data) {
      state.settingsApp.settingsPlatform.settingsGlobal.gridHeight = data
      localStore.set('settingsPlatform.gridHeight', state.settingsApp.settingsPlatform.settingsGlobal.gridHeight)
    },
    setPlatformOverStore(state) {
      state.settingsApp.settingsPlatform.settingsOver.imagesFiltering = platformStore.get('settingsPlatformOver.imagesFiltering', true)
      state.settingsApp.settingsPlatform.settingsOver.imagesDisplay = platformStore.get('settingsPlatformOver.imagesDisplay', 0)
      state.settingsApp.settingsPlatform.settingsOver.displayMode = platformStore.get('settingsPlatformOver.displayMode', 0)
      state.settingsApp.settingsPlatform.settingsOver.gridColumns = platformStore.get('settingsPlatformOver.gridColumns', 4)
      state.settingsApp.settingsPlatform.settingsOver.gridHeight = platformStore.get('settingsPlatformOver.gridHeight', 200)
    },
    setSettingsPlatformOverImagesFiltering(state, data) {
      state.settingsApp.settingsPlatform.settingsOver.imagesFiltering = data
      platformStore.set('settingsPlatformOver.imagesFiltering', state.settingsApp.settingsPlatform.settingsOver.imagesFiltering)
    },
    setSettingsPlatformOverImagesDisplay(state, data) {
      state.settingsApp.settingsPlatform.settingsOver.imagesDisplay = data
      platformStore.set('settingsPlatformOver.imagesDisplay', state.settingsApp.settingsPlatform.settingsOver.imagesDisplay)
    },
    setSettingsPlatformOverDisplayMode(state, data) {
      state.settingsApp.settingsPlatform.settingsOver.displayMode = data
      platformStore.set('settingsPlatformOver.displayMode', state.settingsApp.settingsPlatform.settingsOver.displayMode)
    },
    setSettingsPlatformOverGridColumns(state, data) {
      state.settingsApp.settingsPlatform.settingsOver.gridColumns = data
      platformStore.set('settingsPlatformOver.gridColumns', state.settingsApp.settingsPlatform.settingsOver.gridColumns)
    },
    setSettingsPlatformOverGridHeight(state, data) {
      state.settingsApp.settingsPlatform.settingsOver.gridHeight = data
      platformStore.set('settingsPlatformOver.gridHeight', state.settingsApp.settingsPlatform.settingsOver.gridHeight)
    },
    setSettingsGameHideElementsDetails(state, data) {
      state.settingsApp.settingsGame.settingsGlobal.hideElements.details = data
      localStore.set('settingsGame.hideElements.details', state.settingsApp.settingsGame.settingsGlobal.hideElements.details)
    },
    setSettingsGameHideElementsFavorite(state, data) {
      state.settingsApp.settingsGame.settingsGlobal.hideElements.favorite = data
      localStore.set('settingsGame.hideElements.favorite', state.settingsApp.settingsGame.settingsGlobal.hideElements.favorite)
    },
    setSettingsGameHideElementsGallery(state, data) {
      state.settingsApp.settingsGame.settingsGlobal.hideElements.gallery = data
      localStore.set('settingsGame.hideElements.gallery', state.settingsApp.settingsGame.settingsGlobal.hideElements.gallery)
    },
    setSettingsGameHideElementsFiles(state, data) {
      state.settingsApp.settingsGame.settingsGlobal.hideElements.files = data
      localStore.set('settingsGame.hideElements.files', state.settingsApp.settingsGame.settingsGlobal.hideElements.files)
    },
    setSettingsGameHideElementsLinks(state, data) {
      state.settingsApp.settingsGame.settingsGlobal.hideElements.links = data
      localStore.set('settingsGame.hideElements.links', state.settingsApp.settingsGame.settingsGlobal.hideElements.links)
    },
    setSettingsGameHideElementsNotes(state, data) {
      state.settingsApp.settingsGame.settingsGlobal.hideElements.notes = data
      localStore.set('settingsGame.hideElements.notes', state.settingsApp.settingsGame.settingsGlobal.hideElements.notes)
    },
    setSettingsGameHideElementsPlaylists(state, data) {
      state.settingsApp.settingsGame.settingsGlobal.hideElements.playlists = data
      localStore.set('settingsGame.hideElements.playlists', state.settingsApp.settingsGame.settingsGlobal.hideElements.playlists)
    },
    setSettingsGameHideElementsSettingsPage(state, data) {
      state.settingsApp.settingsGame.settingsGlobal.hideElements.settingsPage = data
      localStore.set('settingsGame.hideElements.settingsPage', state.settingsApp.settingsGame.settingsGlobal.hideElements.settingsPage)
    },
    setSettingsGameHideElementsCover(state, data) {
      state.settingsApp.settingsGame.settingsGlobal.hideElements.cover = data
      localStore.set('settingsGame.hideElements.cover', state.settingsApp.settingsGame.settingsGlobal.hideElements.cover)
    },
    setSettingsGameHideElementsLaunch(state, data) {
      state.settingsApp.settingsGame.settingsGlobal.hideElements.launch = data
      localStore.set('settingsGame.hideElements.launch', state.settingsApp.settingsGame.settingsGlobal.hideElements.launch)
    },
    setSettingsGameHideElementsVersions(state, data) {
      state.settingsApp.settingsGame.settingsGlobal.hideElements.versions = data
      localStore.set('settingsGame.hideElements.versions', state.settingsApp.settingsGame.settingsGlobal.hideElements.versions)
    },
    setSettingsGameHideElementsLinking(state, data) {
      state.settingsApp.settingsGame.settingsGlobal.hideElements.linking = data
      localStore.set('settingsGame.hideElements.linking', state.settingsApp.settingsGame.settingsGlobal.hideElements.linking)
    },
    setSettingsGameHideElementsSettingsGame(state, data) {
      state.settingsApp.settingsGame.settingsGlobal.hideElements.settingsGame = data
      localStore.set('settingsGame.hideElements.settingsGame', state.settingsApp.settingsGame.settingsGlobal.hideElements.settingsGame)
    },
    setSettingsGameHideElementsRegionFlags(state, data) {
      state.settingsApp.settingsGame.settingsGlobal.hideElements.regionFlags = data
      localStore.set('settingsGame.hideElements.regionFlags', state.settingsApp.settingsGame.settingsGlobal.hideElements.regionFlags)
    },
    setSettingsGameHideElementsTags(state, data) {
      state.settingsApp.settingsGame.settingsGlobal.hideElements.tags = data
      localStore.set('settingsGame.hideElements.tags', state.settingsApp.settingsGame.settingsGlobal.hideElements.tags)
    },
    setSettingsGameBackgroundImage(state, data) {
      state.settingsApp.settingsGame.settingsGlobal.backgroundImage = data
      localStore.set('settingsGame.backgroundImage', state.settingsApp.settingsGame.settingsGlobal.backgroundImage)
    },
    setSettingsGameBackgroundPlacement(state, data) {
      state.settingsApp.settingsGame.settingsGlobal.backgroundPlacement = data
      localStore.set('settingsGame.backgroundPlacement', state.settingsApp.settingsGame.settingsGlobal.backgroundPlacement)
    },
    setGameOverStore(state) {
      if (state.selectedPlatform) {
        gameOverStore = new Store({ cwd: app.getAppPath() + '/data/config/' + state.selectedPlatform + '/' + state.gameSelected.gamePlatform, name: state.gameSelected.gamePlatform })
        state.settingsApp.settingsGame.settingsOver.backgroundImage = gameOverStore.get('settingsGameOver.backgroundImage', 0)
        state.settingsApp.settingsGame.settingsOver.backgroundPlacement = gameOverStore.get('settingsGameOver.backgroundPlacement', 0)
        state.settingsApp.settingsGame.settingsOver.colorTheme = gameOverStore.get('settingsGameOver.colorTheme', 'default')
      }
    },
    resetGameOverStore(state) {
      state.settingsApp.settingsGame.settingsOver.backgroundImage = gameOverStore.get('settingsGameOver.backgroundImage', 0)
      state.settingsApp.settingsGame.settingsOver.backgroundPlacement = gameOverStore.get('settingsGameOver.backgroundPlacement', 0)
      state.settingsApp.settingsGame.settingsOver.colorTheme = gameOverStore.get('settingsGameOver.colorTheme', 'default')
    },
    setSettingsGameOverBackgroundImage(state, data) {
      state.settingsApp.settingsGame.settingsOver.backgroundImage = data
      gameOverStore.set('settingsGameOver.backgroundImage', state.settingsApp.settingsGame.settingsOver.backgroundImage)
    },
    setSettingsGameOverBackgroundPlacement(state, data) {
      state.settingsApp.settingsGame.settingsOver.backgroundPlacement = data
      gameOverStore.set('settingsGameOver.backgroundPlacement', state.settingsApp.settingsGame.settingsOver.backgroundPlacement)
    },
    setSettingsGameOverColorTheme(state, data) {
      state.settingsApp.settingsGame.settingsOver.colorTheme = data
      gameOverStore.set('settingsGameOver.colorTheme', state.settingsApp.settingsGame.settingsOver.colorTheme)
    },
    setSettingsImagesScalingEffect(state, data) {
      state.settingsApp.settingsImages.scalingEffect = data
      localStore.set('settingsImages.scalingEffect', state.settingsApp.settingsImages.scalingEffect)
    },
    setSettingsImagesContentSpacing(state, data) {
      state.settingsApp.settingsImages.contentSpacing = data
      localStore.set('settingsImages.contentSpacing', state.settingsApp.settingsImages.contentSpacing)
    },
    setSettingsImagesCornersRounding(state, data) {
      state.settingsApp.settingsImages.cornersRounding = data
      localStore.set('settingsImages.cornersRounding', state.settingsApp.settingsImages.cornersRounding)
    },
    setSettingsImagesGridColumns(state, data) {
      state.settingsApp.settingsImages.gridColumns = data
      localStore.set('settingsImages.gridColumns', state.settingsApp.settingsImages.gridColumns)
    },
    // Platform settings.
    setPlatformStore(state) {
      if (state.selectedPlatform) {
        platformStore = new Store({ cwd: app.getAppPath() + '/data/config/' + state.selectedPlatform, name: state.selectedPlatform })
        state.settingsPlatform.emulator = platformStore.get('settingsPlatform.emulator', null)
        state.settingsPlatform.relativePath = platformStore.get('settingsPlatform.relativePath', '')
      }
    },
    resetPlatformStore(state) {
      state.settingsPlatform.emulator = platformStore.get('settingsPlatform.emulator', null)
      state.settingsPlatform.relativePath = platformStore.get('settingsPlatform.relativePath', '')
    },
    setSettingsPlatformEmulator(state) {
      platformStore.set('settingsPlatform.emulator', state.settingsPlatform.emulator)
    },
    setSettingsPlatformRelativePath(state) {
      platformStore.set('settingsPlatform.relativePath', state.settingsPlatform.relativePath)
    },
    // Game settings.
    setGameStore(state) {
      if (state.selectedPlatform) {
        gameStore = new Store({ cwd: app.getAppPath() + '/data/config/' + state.selectedPlatform + '/' + state.gameSelected.gamePlatform + '/' + state.gameSelected.gameRegion + '/' + state.gameSelected.gameVersion, name: state.gameSelected.gameVersion })
        state.settingsGame.emulator = gameStore.get('settingsGame.emulator', null)
        state.settingsGame.gamePath = gameStore.get('settingsGame.gamePath', '')
        state.settingsGame.gameFile = gameStore.get('settingsGame.gameFile', '')
        state.settingsGame.gameParams = gameStore.get('settingsGame.gameParams', '')
        state.settingsGame.relativePath = gameStore.get('settingsGame.relativePath', true)
      }
    },
    resetGameStore(state) {
      state.settingsGame.emulator = gameStore.get('settingsGame.emulator', null)
      state.settingsGame.gamePath = gameStore.get('settingsGame.gamePath', '')
      state.settingsGame.gameFile = gameStore.get('settingsGame.gameFile', '')
      state.settingsGame.gameParams = gameStore.get('settingsGame.gameParams', '')
      state.settingsGame.relativePath = gameStore.get('settingsGame.relativePath', true)
    },
    setSettingsGameEmulator(state) {
      gameStore.set('settingsGame.emulator', state.settingsGame.emulator)
    },
    setSettingsGameGamePath(state) {
      gameStore.set('settingsGame.gamePath', state.settingsGame.gamePath)
    },
    setSettingsGameGameFile(state) {
      gameStore.set('settingsGame.gameFile', state.settingsGame.gameFile)
    },
    setSettingsGameGameParams(state) {
      gameStore.set('settingsGame.gameParams', state.settingsGame.gameParams)
    },
    setSettingsGameRelativePath(state) {
      gameStore.set('settingsGame.relativePath', state.settingsGame.relativePath)
    },
    // Game form.
    resetGameSelected(state) {
      state.gameSelected.gamePlatform = null
      state.gameSelected.gameRegion = null
      state.gameSelected.gameVersion = null
    },
    setGameForm(state, game) {
      state.gameForm.gamePlatform.developer = game.platform.developer._id
      state.gameForm.gamePlatform.platform = game.platform.platform._id
      state.gameForm.gamePlatform.releaseYear = game.platform.releaseYear
      state.gameForm.gamePlatform.numberPlayers = game.platform.numberPlayers
      state.gameForm.gameRegion.title = game.region.title
      state.gameForm.gameRegion.preTitle = game.region.preTitle
      state.gameForm.gameRegion.subTitle = game.region.subTitle
      state.gameForm.gameRegion.originalTitle = game.region.originalTitle
      state.gameForm.gameRegion.romanizedTitle = game.region.romanizedTitle
      state.gameForm.gameRegion.translatedTitle = game.region.translatedTitle
      state.gameForm.gameRegion.region = game.region.region
      state.gameForm.gameRegion.serial = game.region.serial
      state.gameForm.gameVersion.type = game.version.type
      state.gameForm.gameVersion.name = game.version.name
      state.gameForm.gameVersion.number = game.version.number
      // Avoid reactivity to alter the original reference values.
      state.gameForm.gamePlatform.gameTags = []
      if (game.platform.gameTags) for (let tag of game.platform.gameTags) {
        state.gameForm.gamePlatform.gameTags.push(tag._id)
      }
      state.gameForm.gamePlatform.files.files = []
      if (game.platform.files) for (let file of game.platform.files) {
        state.gameForm.gamePlatform.files.files.push(file)
      }
      state.gameForm.gameRegion.files.files = []
      if (game.region.files) for (let file of game.region.files) {
        state.gameForm.gameRegion.files.files.push(file)
      }
      state.gameForm.gameVersion.files.files = []
      if (game.version.files) for (let file of game.version.files) {
        state.gameForm.gameVersion.files.files.push(file)
      }
      state.gameForm.gamePlatform.notes = []
      if (game.platform.notes) for (let comment of game.platform.notes) {
        state.gameForm.gamePlatform.notes.push(comment)
      }
      state.gameForm.gameRegion.notes = []
      if (game.region.notes) for (let comment of game.region.notes) {
        state.gameForm.gameRegion.notes.push(comment)
      }
      state.gameForm.gameVersion.notes = []
      if (game.version.notes) for (let comment of game.version.notes) {
        state.gameForm.gameVersion.notes.push(comment)
      }
      state.gameForm.gamePlatform.links = []
      if (game.platform.links) for (let link of game.platform.links) {
        state.gameForm.gamePlatform.links.push(link)
      }
      state.gameForm.gameRegion.links = []
      if (game.region.links) for (let link of game.region.links) {
        state.gameForm.gameRegion.links.push(link)
      }
      state.gameForm.gameVersion.links = []
      if (game.version.links) for (let link of game.version.links) {
        state.gameForm.gameVersion.links.push(link)
      }
    },
    resetGameForm(state) {
      state.gameForm.gamePlatform.developer = null
      state.gameForm.gamePlatform.platform = null
      state.gameForm.gamePlatform.releaseYear = null
      state.gameForm.gamePlatform.numberPlayers = null
      state.gameForm.gamePlatform.gameTags = []
      state.gameForm.gamePlatform.notes = []
      state.gameForm.gamePlatform.links = []
      state.gameForm.gamePlatform.files.add = []
      state.gameForm.gamePlatform.files.files = []
      state.gameForm.gamePlatform.files.remove = []
      state.gameForm.gamePlatform.images.cover.add = null
      state.gameForm.gamePlatform.images.cover.remove = false
      state.gameForm.gamePlatform.images.background.add = null
      state.gameForm.gamePlatform.images.background.remove = false
      state.gameForm.gamePlatform.images.pictures.add = []
      state.gameForm.gamePlatform.images.pictures.remove = []
      state.gameForm.gameRegion.title = null
      state.gameForm.gameRegion.preTitle = null
      state.gameForm.gameRegion.subTitle = null
      state.gameForm.gameRegion.originalTitle = null
      state.gameForm.gameRegion.romanizedTitle = null
      state.gameForm.gameRegion.translatedTitle = null
      state.gameForm.gameRegion.region = null
      state.gameForm.gameRegion.serial = null
      state.gameForm.gameRegion.notes = []
      state.gameForm.gameRegion.links = []
      state.gameForm.gameRegion.files.add = []
      state.gameForm.gameRegion.files.files = []
      state.gameForm.gameRegion.files.remove = []
      state.gameForm.gameRegion.images.cover.add = null
      state.gameForm.gameRegion.images.cover.remove = false
      state.gameForm.gameRegion.images.background.add = null
      state.gameForm.gameRegion.images.background.remove = false
      state.gameForm.gameRegion.images.pictures.add = []
      state.gameForm.gameRegion.images.pictures.remove = []
      state.gameForm.gameVersion.type = null
      state.gameForm.gameVersion.name = null
      state.gameForm.gameVersion.number = null
      state.gameForm.gameVersion.notes = []
      state.gameForm.gameVersion.links = []
      state.gameForm.gameVersion.files.add = []
      state.gameForm.gameVersion.files.files = []
      state.gameForm.gameVersion.files.remove = []
      state.gameForm.gameVersion.images.cover.add = null
      state.gameForm.gameVersion.images.cover.remove = false
      state.gameForm.gameVersion.images.background.add = null
      state.gameForm.gameVersion.images.background.remove = false
      state.gameForm.gameVersion.images.pictures.add = []
      state.gameForm.gameVersion.images.pictures.remove = []
    },
    setGamePlatformDeveloper(state, data) {
      state.gameForm.gamePlatform.developer = data
    },
    setGamePlatformPlatform(state, data) {
      state.gameForm.gamePlatform.platform = data
    },
    setGamePlatformReleaseYear(state, data) {
      state.gameForm.gamePlatform.releaseYear = data
    },
    setGamePlatformNumberPlayers(state, data) {
      state.gameForm.gamePlatform.numberPlayers = data
    },
    setGamePlatformNotes(state, data) {
      state.gameForm.gamePlatform.notes = data
    },
    setGamePlatformNotesAdd(state, data) {
      state.gameForm.gamePlatform.notes.push(data)
    },
    setGamePlatformNotesRemove(state, data) {
      state.gameForm.gamePlatform.notes.splice(data, 1)
    },
    setGamePlatformFilesAdd(state, data) {
      state.gameForm.gamePlatform.files.add.push(data)
    },
    setGamePlatformFilesRemoveAdded(state, data) {
      state.gameForm.gamePlatform.files.add.splice(data, 1)
    },
    setGamePlatformFilesRemove(state, data) {
      state.gameForm.gamePlatform.files.remove.push(data)
    },
    setGamePlatformLinks(state, data) {
      state.gameForm.gamePlatform.links = data
    },
    setGamePlatformLinksAdd(state, data, sort) {
      state.gameForm.gamePlatform.links.push(data)
      state.gameForm.gamePlatform.links.sort(sort)
    },
    setGamePlatformLinksRemove(state, data) {
      state.gameForm.gamePlatform.links.splice(data, 1)
    },
    setGamePlatformTags(state, data) {
      state.gameForm.gamePlatform.gameTags = data
    },
    setGamePlatformTagsAdd(state, data) {
      state.gameForm.gamePlatform.gameTags.push(data)
    },
    setGamePlatformTagsRemove(state, data) {
      state.gameForm.gamePlatform.gameTags.splice(data, 1)
    },
    setGamePlatformImagesBackgroundAdd(state, data) {
      state.gameForm.gamePlatform.images.background.add = data
    },
    setGamePlatformImagesBackgroundRemove(state, data) {
      state.gameForm.gamePlatform.images.background.remove = data
    },
    setGamePlatformImagesCoverAdd(state, data) {
      state.gameForm.gamePlatform.images.cover.add = data
    },
    setGamePlatformImagesCoverRemove(state, data) {
      state.gameForm.gamePlatform.images.cover.remove = data
    },
    setGamePlatformImagesPicturesAdd(state, data) {
      state.gameForm.gamePlatform.images.pictures.add = data
    },
    setGamePlatformImagesPicturesRemove(state, data) {
      state.gameForm.gamePlatform.images.pictures.remove = data
    },
    setGameRegionTitle(state, data) {
      state.gameForm.gameRegion.title = data
    },
    setGameRegionPreTitle(state, data) {
      state.gameForm.gameRegion.preTitle = data
    },
    setGameRegionSubTitle(state, data) {
      state.gameForm.gameRegion.subTitle = data
    },
    setGameRegionOriginalTitle(state, data) {
      state.gameForm.gameRegion.originalTitle = data
    },
    setGameRegionRomanizedTitle(state, data) {
      state.gameForm.gameRegion.romanizedTitle = data
    },
    setGameRegionTranslatedTitle(state, data) {
      state.gameForm.gameRegion.translatedTitle = data
    },
    setGameRegionRegion(state, data) {
      state.gameForm.gameRegion.region = data
    },
    setGameRegionSerial(state, data) {
      state.gameForm.gameRegion.serial = data
    },
    setGameRegionNotes(state, data) {
      state.gameForm.gameRegion.notes = data
    },
    setGameRegionNotesAdd(state, data) {
      state.gameForm.gameRegion.notes.push(data)
    },
    setGameRegionNotesRemove(state, data) {
      state.gameForm.gameRegion.notes.splice(data, 1)
    },
    setGameRegionFilesAdd(state, data) {
      state.gameForm.gameRegion.files.add.push(data)
    },
    setGameRegionFilesRemoveAdded(state, data) {
      state.gameForm.gameRegion.files.add.splice(data, 1)
    },
    setGameRegionFilesRemove(state, data) {
      state.gameForm.gameRegion.files.remove.push(data)
    },
    setGameRegionLinks(state, data) {
      state.gameForm.gameRegion.links = data
    },
    setGameRegionLinksAdd(state, data, sort) {
      state.gameForm.gameRegion.links.push(data)
      state.gameForm.gameRegion.links.sort(sort)
    },
    setGameRegionLinksRemove(state, data) {
      state.gameForm.gameRegion.links.splice(data, 1)
    },
    setGameRegionImagesBackgroundAdd(state, data) {
      state.gameForm.gameRegion.images.background.add = data
    },
    setGameRegionImagesBackgroundRemove(state, data) {
      state.gameForm.gameRegion.images.background.remove = data
    },
    setGameRegionImagesCoverAdd(state, data) {
      state.gameForm.gameRegion.images.cover.add = data
    },
    setGameRegionImagesCoverRemove(state, data) {
      state.gameForm.gameRegion.images.cover.remove = data
    },
    setGameRegionImagesPicturesAdd(state, data) {
      state.gameForm.gameRegion.images.pictures.add = data
    },
    setGameRegionImagesPicturesRemove(state, data) {
      state.gameForm.gameRegion.images.pictures.remove = data
    },
    setGameVersionType(state, data) {
      state.gameForm.gameVersion.type = data
    },
    setGameVersionName(state, data) {
      state.gameForm.gameVersion.name = data
    },
    setGameVersionNumber(state, data) {
      state.gameForm.gameVersion.number = data
    },
    setGameVersionNotes(state, data) {
      state.gameForm.gameVersion.notes = data
    },
    setGameVersionNotesAdd(state, data) {
      state.gameForm.gameVersion.notes.push(data)
    },
    setGameVersionNotesRemove(state, data) {
      state.gameForm.gameVersion.notes.splice(data, 1)
    },
    setGameVersionFilesAdd(state, data) {
      state.gameForm.gameVersion.files.add.push(data)
    },
    setGameVersionFilesRemoveAdded(state, data) {
      state.gameForm.gameVersion.files.add.splice(data, 1)
    },
    setGameVersionFilesRemove(state, data) {
      state.gameForm.gameVersion.files.remove.push(data)
    },
    setGameVersionLinks(state, data) {
      state.gameForm.gameVersion.links = data
    },
    setGameVersionLinksAdd(state, data, sort) {
      state.gameForm.gameVersion.links.push(data)
      state.gameForm.gameVersion.links.sort(sort)
    },
    setGameVersionLinksRemove(state, data) {
      state.gameForm.gameVersion.links.splice(data, 1)
    },
    setGameVersionImagesBackgroundAdd(state, data) {
      state.gameForm.gameVersion.images.background.add = data
    },
    setGameVersionImagesBackgroundRemove(state, data) {
      state.gameForm.gameVersion.images.background.remove = data
    },
    setGameVersionImagesCoverAdd(state, data) {
      state.gameForm.gameVersion.images.cover.add = data
    },
    setGameVersionImagesCoverRemove(state, data) {
      state.gameForm.gameVersion.images.cover.remove = data
    },
    setGameVersionImagesPicturesAdd(state, data) {
      state.gameForm.gameVersion.images.pictures.add = data
    },
    setGameVersionImagesPicturesRemove(state, data) {
      state.gameForm.gameVersion.images.pictures.remove = data
    },
    // Developer form.
    resetDeveloperForm(state) {
      state.developerForm.name = null
    },
    setDeveloperName(state, data) {
      state.developerForm.name = data
    },
    // Platform form.
    resetPlatformForm(state) {
      state.platformForm.group = false
      state.platformForm.name = null
      state.platformForm.parent = null
    },
    setPlatformGroup(state, data) {
      state.platformForm.group = data
    },
    setPlatformName(state, data) {
      state.platformForm.name = data
    },
    setPlatformParent(state, data) {
      state.platformForm.parent = data
    },
    // Emulator form.
    setEmulatorForm(state, data) {
      state.emulatorForm.id = data.id
      state.emulatorForm.name = data.name
      state.emulatorForm.path = data.path
      state.emulatorForm.file = data.file
      state.emulatorForm.params = data.params
    },
    resetEmulatorForm(state) {
      state.emulatorForm.id = null
      state.emulatorForm.name = null
      state.emulatorForm.path = null
      state.emulatorForm.file = null
      state.emulatorForm.params = null
    },
    // Playlist form.
    resetPlaylistForm(state) {
      state.playlistForm.name = null
    },
    setPlaylistName(state, data) {
      state.playlistForm.name = data
    },
    // Tag form.
    resetTagForm(state) {
      state.tagForm.name = null
    },
    setTagName(state, data) {
      state.tagForm.name = data
    }
  }
})
