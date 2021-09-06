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
      emulator: null,
      relativeGamesPath: null,
      imageFiltering: true,
    },
    settingsGame: {
      gamePath: null,
      gameFile: null,
      gameParams: null,
      relativePath: true,
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
        links: [],
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
        name: null,
        number: null,
        latest: null,
        comments: [],
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
      state.settingsPlatform.emulator = platformStore.get('settingsPlatform.emulator', '')
      state.settingsPlatform.relativeGamesPath = platformStore.get('settingsPlatform.relativeGamesPath', '')
      state.settingsPlatform.imageFiltering = platformStore.get('settingsPlatform.imageFiltering', true)
    },
    resetPlatformStore(state) {
      state.settingsPlatform.emulator = platformStore.get('settingsPlatform.emulator', '')
      state.settingsPlatform.relativeGamesPath = platformStore.get('settingsPlatform.relativeGamesPath', '')
      state.settingsPlatform.imageFiltering = platformStore.get('settingsPlatform.imageFiltering', true)
    },
    setSettingsPlatformEmulator(state) {
      platformStore.set('settingsPlatform.emulator', state.settingsPlatform.emulator)
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
      state.settingsGame.gameFile = gameStore.get('settingsGame.gameFile', '')
      state.settingsGame.gameParams = gameStore.get('settingsGame.gameParams', '')
      state.settingsGame.relativePath = gameStore.get('settingsGame.relativePath', true)
    },
    resetGameStore(state) {
      state.settingsGame.gamePath = gameStore.get('settingsGame.gamePath', '')
      state.settingsGame.gameFile = gameStore.get('settingsGame.gameFile', '')
      state.settingsGame.gameParams = gameStore.get('settingsGame.gameParams', '')
      state.settingsGame.relativePath = gameStore.get('settingsGame.relativePath', true)
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
    resetGameForm(state) {
      state.gameForm.gamePlatform.developer = null
      state.gameForm.gamePlatform.platform = null
      state.gameForm.gamePlatform.releaseYear = null
      state.gameForm.gamePlatform.numberPlayers = null
      state.gameForm.gamePlatform.links = []
      state.gameForm.gamePlatform.images.cover.add = null
      state.gameForm.gamePlatform.images.cover.remove = false
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
      state.gameForm.gameRegion.images.cover.add = null
      state.gameForm.gameRegion.images.cover.remove = false
      state.gameForm.gameRegion.images.pictures.add = []
      state.gameForm.gameRegion.images.pictures.remove = []
      state.gameForm.gameVersion.name = null
      state.gameForm.gameVersion.number = null
      state.gameForm.gameVersion.latest = null
      state.gameForm.gameVersion.comments = []
      state.gameForm.gameVersion.images.cover.add = null
      state.gameForm.gameVersion.images.cover.remove = false
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
    setGamePlatformLinksAdd(state, data) {
      state.gameForm.gamePlatform.links.push(data)
    },
    setGamePlatformLinksRemove(state, data) {
      state.gameForm.gamePlatform.links.splice(data, 1)
    },
    setGamePlatformImagesCoverAdd(state, data) {
      state.gameForm.gamePlatform.images.cover.add = data
    },
    setGamePlatformImagesCoverRemove(state, data) {
      state.gameForm.gamePlatform.images.cover.remove = data
    },
    setGamePlatformImagesPicturesAdd(state, data) {
      state.gameForm.gamePlatform.images.pictures.add.push(data)
    },
    setGamePlatformImagesPicturesRemove(state, data) {
      state.gameForm.gamePlatform.images.pictures.remove.push(data)
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
    setGameVersionName(state, data) {
      state.gameForm.gameVersion.name = data
    },
    setGameVersionNumber(state, data) {
      state.gameForm.gameVersion.number = data
    },
    setGameVersionLatest(state, data) {
      state.gameForm.gameVersion.latest = data
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
    setGameVersionImagesCoverAdd(state, data) {
      state.gameForm.gameVersion.images.cover.add = data
    },
    setGameVersionImagesCoverRemove(state, data) {
      state.gameForm.gameVersion.images.cover.remove = data
    },
    setGameVersionImagesPicturesAdd(state, data) {
      state.gameForm.gameVersion.images.pictures.add.push(data)
    },
    setGameVersionImagesPicturesRemove(state, data) {
      state.gameForm.gameVersion.images.pictures.remove.push(data)
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
    }
  }
})
