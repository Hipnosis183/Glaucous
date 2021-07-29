import { app } from '@electron/remote'
import { createStore } from 'vuex'
import Store from 'electron-store'

const localStore = new Store({ cwd: app.getAppPath() })

export default createStore({
  state: {
    sidenavExpanded: false,
    slideBack: false,
    editMode: localStore.get('editMode'),
    darkMode: localStore.get('darkMode'),
    selectedTheme: localStore.get('selectedTheme'),
    selectedColor: localStore.get('selectedColor'),
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
    otherSelected: null,
    otherForm: {
      name: null
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
    resetOtherForm(state) {
      state.otherForm.name = null
    },
    setOtherName(state, data) {
      state.otherForm.name = data
    },
  },
  actions: {
  },
  modules: {
  }
})
