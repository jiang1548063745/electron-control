const { ipcMain } = require('electron')
const { send:sendMainWindow } = require('./windows/main')
const { create:createControlWindow } = require('./windows/control')

module.exports = function() {
    // LOGIN
    ipcMain.handle('login', async() => {
        // mock
        let code = Math.floor(Math.random() * (999999 - 100000)) + 10000
        return code
    })

    // CONTROL
    ipcMain.on('control', async (e, remoteCode) => {
        // mock
        sendMainWindow('control-state-change', remoteCode, 1)
        createControlWindow()
    })
}