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
        displayMode: localStore.get('settingsLists.displayMode', 0),
        cornersRounding: localStore.get('settingsLists.cornersRounding', 2),
        cardTextDisplay: localStore.get('settingsLists.cardTextDisplay', 0),
        cardTextStyle: localStore.get('settingsLists.cardTextStyle', 0)
      },
      settingsPlatform: {
        settingsGlobal: {
          imagesDisplay: localStore.get('settingsPlatform.imagesDisplay', 0),
          imagesFiltering: localStore.get('settingsPlatform.imagesFiltering', true),
          gridColumns: localStore.get('settingsPlatform.gridColumns', 4),
          gridHeight: localStore.get('settingsPlatform.gridHeight', 200)
        },
        settingsOver: {
          settingsOver: false,
          imagesFiltering: true,
          imagesDisplay: 0,
          gridColumns: 4,
          gridHeight: 200
        }
      },
      settingsGame: {
        settingsGlobal: {
          displayCoverImage: localStore.get('settingsGame.displayCoverImage', true),
          minimalUiDisplay: localStore.get('settingsGame.minimalUiDisplay', false),
          minimalUiDisplayOptions: {
            playlists: localStore.get('settingsGame.minimalUiDisplayOptions.playlists', true),
            favorites: localStore.get('settingsGame.minimalUiDisplayOptions.favorites', true),
            gameLaunch: localStore.get('settingsGame.minimalUiDisplayOptions.gameLaunch', false),
            versionSelect: localStore.get('settingsGame.minimalUiDisplayOptions.versionSelect', true),
            gameSettings: localStore.get('settingsGame.minimalUiDisplayOptions.gameSettings', true),
            details: localStore.get('settingsGame.minimalUiDisplayOptions.details', true),
            gameLinking: localStore.get('settingsGame.minimalUiDisplayOptions.gameLinking', true),
            links: localStore.get('settingsGame.minimalUiDisplayOptions.links', true),
            gallery: localStore.get('settingsGame.minimalUiDisplayOptions.gallery', true),
            gameTags: localStore.get('settingsGame.minimalUiDisplayOptions.gameTags', true),
            regionFlags: localStore.get('settingsGame.minimalUiDisplayOptions.regionFlags', false)
          },
          backgroundImage: localStore.get('settingsGame.backgroundImage', 0),
          backgroundPlacement: localStore.get('settingsGame.backgroundPlacement', 0)
        },
        settingsOver: {
          settingsOver: false,
          displayCoverImage: true,
          backgroundImage: 0,
          backgroundPlacement: 0,
          colorThemeOver: 'default'
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
        links: [],
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
        links: [],
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
        comments: [],
        links: [],
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
    getSettingsListsDisplayMode(state) {
      return state.settingsApp.settingsLists.displayMode
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
    getSettingsPlatformImagesFiltering(state) {
      return state.settingsApp.settingsPlatform.settingsGlobal.imagesFiltering
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
    getSettingsPlatformOverSettingsOver(state) {
      return state.settingsApp.settingsPlatform.settingsOver.settingsOver
    },
    getSettingsPlatformOverImagesFiltering(state) {
      return state.settingsApp.settingsPlatform.settingsOver.imagesFiltering
    },
    getSettingsPlatformOverImagesDisplay(state) {
      return state.settingsApp.settingsPlatform.settingsOver.imagesDisplay
    },
    getSettingsPlatformOverGridColumns(state) {
      return state.settingsApp.settingsPlatform.settingsOver.gridColumns
    },
    getSettingsPlatformOverGridHeight(state) {
      return state.settingsApp.settingsPlatform.settingsOver.gridHeight
    },
    getSettingsGameDisplayCoverImage(state) {
      return state.settingsApp.settingsGame.settingsGlobal.displayCoverImage
    },
    getSettingsGameMinimalUiDisplay(state) {
      return state.settingsApp.settingsGame.settingsGlobal.minimalUiDisplay
    },
    getSettingsGameMinimalUiDisplayPlaylists(state) {
      return state.settingsApp.settingsGame.settingsGlobal.minimalUiDisplayOptions.playlists
    },
    getSettingsGameMinimalUiDisplayFavorites(state) {
      return state.settingsApp.settingsGame.settingsGlobal.minimalUiDisplayOptions.favorites
    },
    getSettingsGameMinimalUiDisplayGameLaunch(state) {
      return state.settingsApp.settingsGame.settingsGlobal.minimalUiDisplayOptions.gameLaunch
    },
    getSettingsGameMinimalUiDisplayVersionSelect(state) {
      return state.settingsApp.settingsGame.settingsGlobal.minimalUiDisplayOptions.versionSelect
    },
    getSettingsGameMinimalUiDisplayGameSettings(state) {
      return state.settingsApp.settingsGame.settingsGlobal.minimalUiDisplayOptions.gameSettings
    },
    getSettingsGameMinimalUiDisplayDetails(state) {
      return state.settingsApp.settingsGame.settingsGlobal.minimalUiDisplayOptions.details
    },
    getSettingsGameMinimalUiDisplayGameLinking(state) {
      return state.settingsApp.settingsGame.settingsGlobal.minimalUiDisplayOptions.gameLinking
    },
    getSettingsGameMinimalUiDisplayLinks(state) {
      return state.settingsApp.settingsGame.settingsGlobal.minimalUiDisplayOptions.links
    },
    getSettingsGameMinimalUiDisplayGallery(state) {
      return state.settingsApp.settingsGame.settingsGlobal.minimalUiDisplayOptions.gallery
    },
    getSettingsGameMinimalUiDisplayGameTags(state) {
      return state.settingsApp.settingsGame.settingsGlobal.minimalUiDisplayOptions.gameTags
    },
    getSettingsGameMinimalUiDisplayRegionFlags(state) {
      return state.settingsApp.settingsGame.settingsGlobal.minimalUiDisplayOptions.regionFlags
    },
    getSettingsGameBackgroundImage(state) {
      return state.settingsApp.settingsGame.settingsGlobal.backgroundImage
    },
    getSettingsGameBackgroundPlacement(state) {
      return state.settingsApp.settingsGame.settingsGlobal.backgroundPlacement
    },
    getSettingsGameOverSettingsOver(state) {
      return state.settingsApp.settingsGame.settingsOver.settingsOver
    },
    getSettingsGameOverDisplayCoverImage(state) {
      return state.settingsApp.settingsGame.settingsOver.displayCoverImage
    },
    getSettingsGameOverBackgroundImage(state) {
      return state.settingsApp.settingsGame.settingsOver.backgroundImage
    },
    getSettingsGameOverBackgroundPlacement(state) {
      return state.settingsApp.settingsGame.settingsOver.backgroundPlacement
    },
    getSettingsGameOverColorThemeOver(state) {
      return state.settingsApp.settingsGame.settingsOver.colorThemeOver
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
    setSettingsListsDisplayMode(state, data) {
      state.settingsApp.settingsLists.displayMode = data
      localStore.set('settingsLists.displayMode', state.settingsApp.settingsLists.displayMode)
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
    setSettingsPlatformImagesFiltering(state, data) {
      state.settingsApp.settingsPlatform.settingsGlobal.imagesFiltering = data
      localStore.set('settingsPlatform.imagesFiltering', state.settingsApp.settingsPlatform.settingsGlobal.imagesFiltering)
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
      state.settingsApp.settingsPlatform.settingsOver.settingsOver = platformStore.get('settingsPlatformOver.settingsOver', false)
      state.settingsApp.settingsPlatform.settingsOver.imagesFiltering = platformStore.get('settingsPlatformOver.imagesFiltering', true)
      state.settingsApp.settingsPlatform.settingsOver.imagesDisplay = platformStore.get('settingsPlatformOver.imagesDisplay', 0)
      state.settingsApp.settingsPlatform.settingsOver.gridColumns = platformStore.get('settingsPlatformOver.gridColumns', 4)
      state.settingsApp.settingsPlatform.settingsOver.gridHeight = platformStore.get('settingsPlatformOver.gridHeight', 200)
    },
    setSettingsPlatformOverSettingsOver(state, data) {
      state.settingsApp.settingsPlatform.settingsOver.settingsOver = data
      platformStore.set('settingsPlatformOver.settingsOver', state.settingsApp.settingsPlatform.settingsOver.settingsOver)
    },
    setSettingsPlatformOverImagesFiltering(state, data) {
      state.settingsApp.settingsPlatform.settingsOver.imagesFiltering = data
      platformStore.set('settingsPlatformOver.imagesFiltering', state.settingsApp.settingsPlatform.settingsOver.imagesFiltering)
    },
    setgetSettingsPlatformOverImagesDisplay(state, data) {
      state.settingsApp.settingsPlatform.settingsOver.imagesDisplay = data
      platformStore.set('settingsPlatformOver.imagesDisplay', state.settingsApp.settingsPlatform.settingsOver.imagesDisplay)
    },
    setSettingsPlatformOverListColumns(state, data) {
      state.settingsApp.settingsPlatform.settingsOver.gridColumns = data
      platformStore.set('settingsPlatformOver.gridColumns', state.settingsApp.settingsPlatform.settingsOver.gridColumns)
    },
    setgetSettingsPlatformOverGridHeight(state, data) {
      state.settingsApp.settingsPlatform.settingsOver.gridHeight = data
      platformStore.set('settingsPlatformOver.gridHeight', state.settingsApp.settingsPlatform.settingsOver.gridHeight)
    },
    setSettingsGameDisplayCoverImage(state, data) {
      state.settingsApp.settingsGame.settingsGlobal.displayCoverImage = data
      localStore.set('settingsGame.displayCoverImage', state.settingsApp.settingsGame.settingsGlobal.displayCoverImage)
    },
    setSettingsGameMinimalUiDisplay(state, data) {
      state.settingsApp.settingsGame.settingsGlobal.minimalUiDisplay = data
      localStore.set('settingsGame.minimalUiDisplay', state.settingsApp.settingsGame.settingsGlobal.minimalUiDisplay)
    },
    setSettingsGameMinimalUiDisplayPlaylists(state, data) {
      state.settingsApp.settingsGame.settingsGlobal.minimalUiDisplayOptions.playlists = data
      localStore.set('settingsGame.minimalUiDisplayOptions.playlists', state.settingsApp.settingsGame.settingsGlobal.minimalUiDisplayOptions.playlists)
    },
    setSettingsGameMinimalUiDisplayFavorites(state, data) {
      state.settingsApp.settingsGame.settingsGlobal.minimalUiDisplayOptions.favorites = data
      localStore.set('settingsGame.minimalUiDisplayOptions.favorites', state.settingsApp.settingsGame.settingsGlobal.minimalUiDisplayOptions.favorites)
    },
    setSettingsGameMinimalUiDisplayGameLaunch(state, data) {
      state.settingsApp.settingsGame.settingsGlobal.minimalUiDisplayOptions.gameLaunch = data
      localStore.set('settingsGame.minimalUiDisplayOptions.gameLaunch', state.settingsApp.settingsGame.settingsGlobal.minimalUiDisplayOptions.gameLaunch)
    },
    setSettingsGameMinimalUiDisplayVersionSelect(state, data) {
      state.settingsApp.settingsGame.settingsGlobal.minimalUiDisplayOptions.versionSelect = data
      localStore.set('settingsGame.minimalUiDisplayOptions.versionSelect', state.settingsApp.settingsGame.settingsGlobal.minimalUiDisplayOptions.versionSelect)
    },
    setSettingsGameMinimalUiDisplayGameSettings(state, data) {
      state.settingsApp.settingsGame.settingsGlobal.minimalUiDisplayOptions.gameSettings = data
      localStore.set('settingsGame.minimalUiDisplayOptions.gameSettings', state.settingsApp.settingsGame.settingsGlobal.minimalUiDisplayOptions.gameSettings)
    },
    setSettingsGameMinimalUiDisplayDetails(state, data) {
      state.settingsApp.settingsGame.settingsGlobal.minimalUiDisplayOptions.details = data
      localStore.set('settingsGame.minimalUiDisplayOptions.details', state.settingsApp.settingsGame.settingsGlobal.minimalUiDisplayOptions.details)
    },
    setSettingsGameMinimalUiDisplayGameLinking(state, data) {
      state.settingsApp.settingsGame.settingsGlobal.minimalUiDisplayOptions.gameLinking = data
      localStore.set('settingsGame.minimalUiDisplayOptions.gameLinking', state.settingsApp.settingsGame.settingsGlobal.minimalUiDisplayOptions.gameLinking)
    },
    setSettingsGameMinimalUiDisplayLinks(state, data) {
      state.settingsApp.settingsGame.settingsGlobal.minimalUiDisplayOptions.links = data
      localStore.set('settingsGame.minimalUiDisplayOptions.links', state.settingsApp.settingsGame.settingsGlobal.minimalUiDisplayOptions.links)
    },
    setSettingsGameMinimalUiDisplayGallery(state, data) {
      state.settingsApp.settingsGame.settingsGlobal.minimalUiDisplayOptions.gallery = data
      localStore.set('settingsGame.minimalUiDisplayOptions.gallery', state.settingsApp.settingsGame.settingsGlobal.minimalUiDisplayOptions.gallery)
    },
    setSettingsGameMinimalUiDisplayGameTags(state, data) {
      state.settingsApp.settingsGame.settingsGlobal.minimalUiDisplayOptions.gameTags = data
      localStore.set('settingsGame.minimalUiDisplayOptions.gameTags', state.settingsApp.settingsGame.settingsGlobal.minimalUiDisplayOptions.gameTags)
    },
    setSettingsGameMinimalUiDisplayRegionFlags(state, data) {
      state.settingsApp.settingsGame.settingsGlobal.minimalUiDisplayOptions.regionFlags = data
      localStore.set('settingsGame.minimalUiDisplayOptions.regionFlags', state.settingsApp.settingsGame.settingsGlobal.minimalUiDisplayOptions.regionFlags)
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
        state.settingsApp.settingsGame.settingsOver.settingsOver = gameOverStore.get('settingsGameOver.settingsOver', false)
        state.settingsApp.settingsGame.settingsOver.displayCoverImage = gameOverStore.get('settingsGameOver.displayCoverImage', true)
        state.settingsApp.settingsGame.settingsOver.backgroundImage = gameOverStore.get('settingsGameOver.backgroundImage', 0)
        state.settingsApp.settingsGame.settingsOver.backgroundPlacement = gameOverStore.get('settingsGameOver.backgroundPlacement', 0)
        state.settingsApp.settingsGame.settingsOver.colorThemeOver = gameOverStore.get('settingsGameOver.colorThemeOver', 'default')
      }
    },
    resetGameOverStore(state) {
      state.settingsApp.settingsGame.settingsOver.settingsOver = gameOverStore.get('settingsGameOver.settingsOver', false)
      state.settingsApp.settingsGame.settingsOver.displayCoverImage = gameOverStore.get('settingsGameOver.displayCoverImage', true)
      state.settingsApp.settingsGame.settingsOver.backgroundImage = gameOverStore.get('settingsGameOver.backgroundImage', 0)
      state.settingsApp.settingsGame.settingsOver.backgroundPlacement = gameOverStore.get('settingsGameOver.backgroundPlacement', 0)
      state.settingsApp.settingsGame.settingsOver.colorThemeOver = gameOverStore.get('settingsGameOver.colorThemeOver', 'default')
    },
    setSettingsGameOverSettingsOver(state, data) {
      state.settingsApp.settingsGame.settingsOver.settingsOver = data
      gameOverStore.set('settingsGameOver.settingsOver', state.settingsApp.settingsGame.settingsOver.settingsOver)
    },
    setSettingsGameOverDisplayCoverImage(state, data) {
      state.settingsApp.settingsGame.settingsOver.displayCoverImage = data
      gameOverStore.set('settingsGameOver.displayCoverImage', state.settingsApp.settingsGame.settingsOver.displayCoverImage)
    },
    setSettingsGameOverBackgroundImage(state, data) {
      state.settingsApp.settingsGame.settingsOver.backgroundImage = data
      gameOverStore.set('settingsGameOver.backgroundImage', state.settingsApp.settingsGame.settingsOver.backgroundImage)
    },
    setSettingsGameOverBackgroundPlacement(state, data) {
      state.settingsApp.settingsGame.settingsOver.backgroundPlacement = data
      gameOverStore.set('settingsGameOver.backgroundPlacement', state.settingsApp.settingsGame.settingsOver.backgroundPlacement)
    },
    setSettingsGameOverColorThemeOver(state, data) {
      state.settingsApp.settingsGame.settingsOver.colorThemeOver = data
      gameOverStore.set('settingsGameOver.colorThemeOver', state.settingsApp.settingsGame.settingsOver.colorThemeOver)
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
      state.gameForm.gameVersion.comments = []
      if (game.version.comments) for (let comment of game.version.comments) {
        state.gameForm.gameVersion.comments.push(comment)
      }
    },
    resetGameForm(state) {
      state.gameForm.gamePlatform.developer = null
      state.gameForm.gamePlatform.platform = null
      state.gameForm.gamePlatform.releaseYear = null
      state.gameForm.gamePlatform.numberPlayers = null
      state.gameForm.gamePlatform.gameTags = []
      state.gameForm.gamePlatform.links = []
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
      state.gameForm.gameRegion.links = []
      state.gameForm.gameRegion.images.cover.add = null
      state.gameForm.gameRegion.images.cover.remove = false
      state.gameForm.gameRegion.images.background.add = null
      state.gameForm.gameRegion.images.background.remove = false
      state.gameForm.gameRegion.images.pictures.add = []
      state.gameForm.gameRegion.images.pictures.remove = []
      state.gameForm.gameVersion.type = null
      state.gameForm.gameVersion.name = null
      state.gameForm.gameVersion.number = null
      state.gameForm.gameVersion.comments = []
      state.gameForm.gameVersion.links = []
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
    setGameVersionComments(state, data) {
      state.gameForm.gameVersion.comments = data
    },
    setGameVersionCommentsAdd(state, data) {
      state.gameForm.gameVersion.comments.push(data)
    },
    setGameVersionCommentsRemove(state, data) {
      state.gameForm.gameVersion.comments.splice(data, 1)
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
