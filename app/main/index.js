/**
 *  主进程
 */
const { app } = require('electron')
const handleIPC = require('./ipc')
const { create: createMainWindow, show: showMainWindow, close: closeMainWindow } = require('./windows/main')

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
    app.quit()
} else {
    app.on('second-instance', () => {
        showMainWindow()
    })

    app.on('ready', () => {
        createMainWindow()
        handleIPC()

        require('./trayAndMenu')
        require('./robot.js')()
    })

    app.on('before-quit', () => {
        closeMainWindow()
    })

    app.on('activate', () => {
        showMainWindow()
    })
}

/**
 * 注:
 *  编译 robotjs
 *  npm rebuild --runtime=electron --disturl=https://atom.io/download/atom-shell --target=7.1.8 --abi=72
 *  npx electron-rebuild 
 */    