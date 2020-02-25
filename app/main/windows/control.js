const { BrowserWindow } = require('electron')
const path = require('path')

let win

/**
 * 创建CONTROL窗口
 */
function create() {
    win = new BrowserWindow({
        width: 1000,
        height: 680,
        webPreferences: {
            nodeIntegration: true
        }
    })
    win.loadFile(path.resolve(__dirname, '../../renderer/pages/control/index.html'))
}

/**
 * 推送状态
 * @param {*} channel       // 信道
 * @param  {...any} args    // 参数
 */
function send(channel, ...args) {
    // 主进程推送状态
    win.webContents.send(channel, ...args)
}

module.exports = { create, send }