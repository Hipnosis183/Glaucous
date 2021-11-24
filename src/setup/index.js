// Import Vue functions.
import store from '@/store'
// Import functions from modules.
import { getCurrentWindow } from '@electron/remote'
// Import settings objects and functions.
import { selectImageGridColumns, selectImageCornersRounding, selectListCornersRounding } from '@/settings'
// Import theme objects and functions.
import { selectColor, selectFont, selectTheme } from '@/theme'

// Set fullscreen mode if enable in the store.
getCurrentWindow().setFullScreen(store.getters.getSettingsGeneralFullscreenMode)
// Set theme stored in the configuration.
selectTheme(store.getters.getSettingsThemesSelectedTheme)
// Set color theme stored in the configuration.
selectColor(store.getters.getSettingsThemesSelectedColor)
// Set number of columns of lists in the configuration.
selectFont(store.getters.getSettingsThemesSelectedFont)
// Set number of columns of images in the configuration.
selectImageGridColumns(store.getters.getSettingsImagesGridColumns)
// Set border radius of images in the configuration.
selectImageCornersRounding(store.getters.getSettingsImagesCornersRounding)
// Set border radius of cards in the configuration.
selectListCornersRounding(store.getters.getSettingsListsCornersRounding)

// Manage fullscreen settings changes on the fly.
getCurrentWindow().on('enter-full-screen', () => { manageFullScreen() })
getCurrentWindow().on('leave-full-screen', () => { manageFullScreen() })
const manageFullScreen = () => {
  // Check if the fullscreen event came from a key press instead of a settings change.
  if (store.getters.getSettingsGeneralFullscreenMode != getCurrentWindow().isFullScreen()) {
    store.commit('setSettingsGeneralFullscreenMode')
  }
}