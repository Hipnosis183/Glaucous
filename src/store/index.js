import { app } from '@electron/remote'
import { createStore } from 'vuex'
import Store from 'electron-store'

// App settings store.
const localStore = new Store({ cwd: app.getAppPath() })
// Platform settings store.
let platformStore
// Game settings store.
let gameStore

export default createStore({
  state: {
    sidenavExpanded: false,
    slideBack: false,
    settingsApp: {
      settingsGeneral: {
        editMode: localStore.get('settingsGeneral.editMode', true)
      },
      settingsGames: {
        groupsView: localStore.get('settingsGames.groupsView', true)
      },
      settingsThemes: {
        darkMode: localStore.get('settingsThemes.darkMode', false),
        selectedTheme: localStore.get('settingsThemes.selectedTheme', 0),
        selectedColor: localStore.get('settingsThemes.selectedColor', 0)
      },
      settingsLinks: {
        searchGoogle: localStore.get('settingsLinks.searchGoogle', true),
        searchGoogleKey: localStore.get('settingsLinks.searchGoogleKey', 0)
      },
      settingsCards: {
        cardMode: localStore.get('settingsCards.cardMode', 1),
        cardColumns: localStore.get('settingsCards.cardColumns', 1),
        cardImageDisplay: localStore.get('settingsCards.cardImageDisplay', true),
        cardImagePosition: localStore.get('settingsCards.cardImagePosition', 0),
        cardTextDisplay: localStore.get('settingsCards.cardTextDisplay', true),
        cardTextPosition: localStore.get('settingsCards.cardTextPosition', 1)
      }
    },
    selectedPlatform: null,
    settingsPlatform: {
      executablePath: null,
      executableCommand: null,
      relativeGamesPath: null,
      imageFiltering: true,
    },
    settingsGame: {
      gamePath: null,
      relativePath: false,
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
        latestVersion: null,
        links: []
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
        images: {
          cover: {
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
        currentVersion: null,
        comments: []
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
    }
  },
  getters: {
    // App settings.
    getSettingsGeneralEditMode(state) {
      return state.settingsApp.settingsGeneral.editMode
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
    getSettingsGamesGroupsView(state) {
      return state.settingsApp.settingsGames.groupsView
    },
    getSettingsLinksSearchGoogle(state) {
      return state.settingsApp.settingsLinks.searchGoogle
    },
    getSettingsLinksSearchGoogleKey(state) {
      return state.settingsApp.settingsLinks.searchGoogleKey
    },
    getSettingsCardsCardMode(state) {
      return state.settingsApp.settingsCards.cardMode
    },
    getSettingsCardsCardColumns(state) {
      return state.settingsApp.settingsCards.cardColumns
    },
    getSettingsCardsCardImageDisplay(state) {
      return state.settingsApp.settingsCards.cardImageDisplay
    },
    getSettingsCardsCardImagePosition(state) {
      return state.settingsApp.settingsCards.cardImagePosition
    },
    getSettingsCardsCardTextDisplay(state) {
      return state.settingsApp.settingsCards.cardTextDisplay
    },
    getSettingsCardsCardTextPosition(state) {
      return state.settingsApp.settingsCards.cardTextPosition
    }
  },
  mutations: {
    // App settings.
    setSettingsGeneralEditMode(state) {
      state.settingsApp.settingsGeneral.editMode = !state.settingsApp.settingsGeneral.editMode
      localStore.set('settingsGeneral.editMode', state.settingsApp.settingsGeneral.editMode)
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
    setSettingsGamesGroupsView(state) {
      state.settingsApp.settingsGames.groupsView = !state.settingsApp.settingsGames.groupsView
      localStore.set('settingsGames.groupsView', state.settingsApp.settingsGames.groupsView)
    },
    setSettingsLinksSearchGoogle(state) {
      state.settingsApp.settingsLinks.searchGoogle = !state.settingsApp.settingsLinks.searchGoogle
      localStore.set('settingsLinks.searchGoogle', state.settingsApp.settingsLinks.searchGoogle)
    },
    setSettingsLinksSearchGoogleKey(state, data) {
      state.settingsApp.settingsLinks.searchGoogleKey = data
      localStore.set('settingsLinks.searchGoogleKey', state.settingsApp.settingsLinks.searchGoogleKey)
    },
    setSettingsCardsCardMode(state, data) {
      state.settingsApp.settingsCards.cardMode = data
      localStore.set('settingsCards.cardMode', state.settingsApp.settingsCards.cardMode)
    },
    setSettingsCardsCardColumns(state, data) {
      state.settingsApp.settingsCards.cardColumns = data
      localStore.set('settingsCards.cardColumns', state.settingsApp.settingsCards.cardColumns)
    },
    setSettingsCardsCardImageDisplay(state) {
      state.settingsApp.settingsCards.cardImageDisplay = !state.settingsApp.settingsCards.cardImageDisplay
      localStore.set('settingsCards.cardImageDisplay', state.settingsApp.settingsCards.cardImageDisplay)
    },
    setSettingsCardsCardImagePosition(state, data) {
      state.settingsApp.settingsCards.cardImagePosition = data
      localStore.set('settingsCards.cardImagePosition', state.settingsApp.settingsCards.cardImagePosition)
    },
    setSettingsCardsCardTextDisplay(state) {
      state.settingsApp.settingsCards.cardTextDisplay = !state.settingsApp.settingsCards.cardTextDisplay
      localStore.set('settingsCards.cardTextDisplay', state.settingsApp.settingsCards.cardTextDisplay)
    },
    setSettingsCardsCardTextPosition(state, data) {
      state.settingsApp.settingsCards.cardTextPosition = data
      localStore.set('settingsCards.cardTextPosition', state.settingsApp.settingsCards.cardTextPosition)
    },
    // Platform settings.
    setPlatformStore(state) {
      platformStore = new Store({ cwd: app.getAppPath() + '/data/' + state.selectedPlatform })
      state.settingsPlatform.executablePath = platformStore.get('settingsPlatform.executablePath', '')
      state.settingsPlatform.executableCommand = platformStore.get('settingsPlatform.executableCommand', '')
      state.settingsPlatform.relativeGamesPath = platformStore.get('settingsPlatform.relativeGamesPath', '')
      state.settingsPlatform.imageFiltering = platformStore.get('settingsPlatform.imageFiltering', true)
    },
    resetPlatformStore(state) {
      state.settingsPlatform.executablePath = platformStore.get('settingsPlatform.executablePath', '')
      state.settingsPlatform.executableCommand = platformStore.get('settingsPlatform.executableCommand', '')
      state.settingsPlatform.relativeGamesPath = platformStore.get('settingsPlatform.relativeGamesPath', '')
      state.settingsPlatform.imageFiltering = platformStore.get('settingsPlatform.imageFiltering', true)
    },
    setSettingsPlatformExecutablePath(state) {
      platformStore.set('settingsPlatform.executablePath', state.settingsPlatform.executablePath)
    },
    setSettingsPlatformExecutableCommand(state) {
      platformStore.set('settingsPlatform.executableCommand', state.settingsPlatform.executableCommand)
    },
    setSettingsPlatformRelativeGamesPath(state) {
      platformStore.set('settingsPlatform.relativeGamesPath', state.settingsPlatform.relativeGamesPath)
    },
    setSettingsPlatformImageFiltering(state) {
      platformStore.set('settingsPlatform.imageFiltering', state.settingsPlatform.imageFiltering)
    },
    // Game settings.
    setGameStore(state) {
      gameStore = new Store({ cwd: app.getAppPath() + '/data/' + state.selectedPlatform + '/' + state.gameSelected.gamePlatform + '/' + state.gameSelected.gameRegion + '/games/' + state.gameSelected.gameVersion })
      state.settingsGame.gamePath = gameStore.get('settingsGame.gamePath', '')
      state.settingsGame.relativePath = gameStore.get('settingsGame.relativePath', false)
    },
    resetGameStore(state) {
      state.settingsGame.gamePath = gameStore.get('settingsGame.gamePath', '')
      state.settingsGame.relativePath = gameStore.get('settingsGame.relativePath', false)
    },
    setSettingsGameGamePath(state) {
      gameStore.set('settingsGame.gamePath', state.settingsGame.gamePath)
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
    resetGameForm(state) {
      state.gameForm.gamePlatform.developer = null
      state.gameForm.gamePlatform.platform = null
      state.gameForm.gamePlatform.releaseYear = null
      state.gameForm.gamePlatform.numberPlayers = null
      state.gameForm.gamePlatform.latestVersion = null
      state.gameForm.gamePlatform.links = []
      state.gameForm.gameRegion.title = null
      state.gameForm.gameRegion.preTitle = null
      state.gameForm.gameRegion.subTitle = null
      state.gameForm.gameRegion.originalTitle = null
      state.gameForm.gameRegion.romanizedTitle = null
      state.gameForm.gameRegion.translatedTitle = null
      state.gameForm.gameRegion.region = null
      state.gameForm.gameRegion.serial = null
      state.gameForm.gameRegion.images.cover.add = null
      state.gameForm.gameRegion.images.cover.remove = false
      state.gameForm.gameRegion.images.pictures.add = []
      state.gameForm.gameRegion.images.pictures.remove = []
      state.gameForm.gameVersion.currentVersion = null
      state.gameForm.gameVersion.comments = []
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
    setGamePlatformLatestVersion(state, data) {
      state.gameForm.gamePlatform.latestVersion = data
    },
    setGamePlatformLinks(state, data) {
      state.gameForm.gamePlatform.links = data
    },
    setGamePlatformLinksAdd(state, data) {
      state.gameForm.gamePlatform.links.push(data)
    },
    setGamePlatformLinksRemove(state, data) {
      state.gameForm.gamePlatform.links.splice(data, 1)
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
    setGameRegionImagesCoverAdd(state, data) {
      state.gameForm.gameRegion.images.cover.add = data
    },
    setGameRegionImagesCoverRemove(state, data) {
      state.gameForm.gameRegion.images.cover.remove = data
    },
    setGameRegionImagesPicturesAdd(state, data) {
      state.gameForm.gameRegion.images.pictures.add.push(data)
    },
    setGameRegionImagesPicturesRemove(state, data) {
      state.gameForm.gameRegion.images.pictures.remove.push(data)
    },
    setGameVersionCurrentVersion(state, data) {
      state.gameForm.gameVersion.currentVersion = data
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
    }
  }
})
