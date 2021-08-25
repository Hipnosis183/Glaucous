import { app } from '@electron/remote'
import { createStore } from 'vuex'
import Store from 'electron-store'

const localStore = new Store({ cwd: app.getAppPath() })

export default createStore({
  state: {
    sidenavExpanded: false,
    slideBack: false,
    editMode: localStore.get('editMode', true),
    darkMode: localStore.get('darkMode', false),
    selectedTheme: localStore.get('selectedTheme', 0),
    selectedColor: localStore.get('selectedColor', 0),
    groupsView: localStore.get('groupsView', true),
    searchGoogle: localStore.get('searchGoogle', true),
    searchGoogleKey: localStore.get('searchGoogleKey', 0),
    cardMode: localStore.get('cardMode', 1),
    cardColumns: localStore.get('cardColumns', 1),
    cardImageDisplay: localStore.get('cardImageDisplay', true),
    cardImagePosition: localStore.get('cardImagePosition', 0),
    cardTextDisplay: localStore.get('cardTextDisplay', true),
    cardTextPosition: localStore.get('cardTextPosition', 1),
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
  mutations: {
    toggleEditMode(state) {
      state.editMode = !state.editMode
      localStore.set('editMode', state.editMode)
    },
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode
      localStore.set('darkMode', state.darkMode)
    },
    selectTheme(state, data) {
      state.selectedTheme = data
      localStore.set('selectedTheme', state.selectedTheme)
    },
    selectColor(state, data) {
      state.selectedColor = data
      localStore.set('selectedColor', state.selectedColor)
    },
    toggleGroupsView(state) {
      state.groupsView = !state.groupsView
      localStore.set('groupsView', state.groupsView)
    },
    toggleSearchGoogle(state) {
      state.searchGoogle = !state.searchGoogle
      localStore.set('searchGoogle', state.searchGoogle)
    },
    selectSearchGoogleKey(state, data) {
      state.searchGoogleKey = data
      localStore.set('searchGoogleKey', state.searchGoogleKey)
    },
    selectCardMode(state, data) {
      state.cardMode = data
      localStore.set('cardMode', state.cardMode)
    },
    selectCardColumns(state, data) {
      state.cardColumns = data
      localStore.set('cardColumns', state.cardColumns)
    },
    toggleCardImageDisplay(state) {
      state.cardImageDisplay = !state.cardImageDisplay
      localStore.set('cardImageDisplay', state.cardImageDisplay)
    },
    selectCardImagePosition(state, data) {
      state.cardImagePosition = data
      localStore.set('cardImagePosition', state.cardImagePosition)
    },
    toggleCardTextDisplay(state) {
      state.cardTextDisplay = !state.cardTextDisplay
      localStore.set('cardTextDisplay', state.cardTextDisplay)
    },
    selectCardTextPosition(state, data) {
      state.cardTextPosition = data
      localStore.set('cardTextPosition', state.cardTextPosition)
    },
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
    resetDeveloperForm(state) {
      state.developerForm.name = null
    },
    setDeveloperName(state, data) {
      state.developerForm.name = data
    },
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
  },
  actions: {
  },
  modules: {
  }
})
