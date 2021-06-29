import { createStore } from 'vuex'

export default createStore({
  state: {
    sidenavExpanded: true,
    gameForm: {
      gamePlatform: {
        developer: null,
        platform: null,
        releaseYear: null,
        numberPlayers: null,
        latestVersion: null
      },
      gameRegion: {
        title: null,
        subTitle: null,
        originalTitle: null,
        romanizedTitle: null,
        translatedTitle: null,
        region: null
      },
      gameVersion: {
        currentVersion: null,
        comments: null
      }
    }
  },
  mutations: {
    resetGameForm (state) {
      state.gameForm.gamePlatform.developer = null
      state.gameForm.gamePlatform.platform = null
      state.gameForm.gamePlatform.releaseYear = null
      state.gameForm.gamePlatform.numberPlayers = null
      state.gameForm.gamePlatform.latestVersion = null
      state.gameForm.gameRegion.title = null
      state.gameForm.gameRegion.subTitle = null
      state.gameForm.gameRegion.originalTitle = null
      state.gameForm.gameRegion.romanizedTitle = null
      state.gameForm.gameRegion.translatedTitle = null
      state.gameForm.gameRegion.region = null
      state.gameForm.gameVersion.currentVersion = null
      state.gameForm.gameVersion.comments = null
    },
    setGamePlatformDeveloper (state, data) {
      state.gameForm.gamePlatform.developer = data
    },
    setGamePlatformPlatform (state, data) {
      state.gameForm.gamePlatform.platform = data
    },
    setGamePlatformReleaseYear (state, data) {
      state.gameForm.gamePlatform.releaseYear = data
    },
    setGamePlatformNumberPlayers (state, data) {
      state.gameForm.gamePlatform.numberPlayers = data
    },
    setGamePlatformLatestVersion (state, data) {
      state.gameForm.gamePlatform.latestVersion = data
    },
    setGameRegionTitle (state, data) {
      state.gameForm.gameRegion.title = data
    },
    setGameRegionSubTitle (state, data) {
      state.gameForm.gameRegion.subTitle = data
    },
    setGameRegionOriginalTitle (state, data) {
      state.gameForm.gameRegion.originalTitle = data
    },
    setGameRegionRomanizedTitle (state, data) {
      state.gameForm.gameRegion.romanizedTitle = data
    },
    setGameRegionTranslatedTitle (state, data) {
      state.gameForm.gameRegion.translatedTitle = data
    },
    setGameRegionRegion (state, data) {
      state.gameForm.gameRegion.region = data
    },
    setGameVersionCurrentVersion (state, data) {
      state.gameForm.gameVersion.currentVersion = data
    },
    setGameVersionComments (state, data) {
      state.gameForm.gameVersion.comments = data
    }
  },
  actions: {
  },
  modules: {
  }
})
