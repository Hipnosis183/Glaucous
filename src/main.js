'use strict'

import { app, protocol, BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import Store from 'electron-store'
import path from 'path'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'

// Set development mode status value.
const IS_DEV = process.env.NODE_ENV !== 'production'

// Initialize external Electron remote module.
require('@electron/remote/main').initialize()

// Initialize electron-store.
Store.initRenderer()

// Scheme must be registered before the app is ready.
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    show: false,
    icon: path.join(__static, '/images/icon.png'),
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      spellcheck: false,
      webSecurity: false
    }
  })
  // Manage fullscreen state.
  let fullscreen = false
  win.once('fullscreen', (value) => { if (value) { fullscreen = true } })
  // Render window once it finished loading.
  win.once('ready-to-show', () => { win.show(); win.setFullScreen(fullscreen) })
  // Disable manu bar display.
  win.setMenuBarVisibility(false)
  // Enable Electron remote module.
  require('@electron/remote/main').enable(win.webContents)
  // Manage app loading.
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the development server URL.
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    // Open devtools panel.
    if (!process.env.IS_TEST) { win.webContents.openDevTools() }
  } else {
    // Load the application 'index.html'.
    createProtocol('app')
    win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with 'Cmd + Q'.
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (IS_DEV && !process.env.IS_TEST) {
    // Install Vue Devtools.
    try { await installExtension(VUEJS3_DEVTOOLS) }
    catch (e) { console.error('Vue Devtools error:', e.toString()) }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (IS_DEV) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') { app.quit() }
    })
  } else {
    process.on('SIGTERM', () => { app.quit() })
  }
}
