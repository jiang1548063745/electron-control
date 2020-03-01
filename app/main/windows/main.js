/**
 * 主界面窗口
 */
const { BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')

let win

let willQuitApp = false

/**
 * 创建主窗口
 */
function create () {
    win = new BrowserWindow({
        width: 600,
        height: 300,
        webPreferences: {
            nodeIntegration: true // 打开NODE环境支持
        }
    })

    // 关闭窗口
    win.on('close', (e) => {
        if(willQuitApp) {
            win = null
        } else {
            e.preventDefault()
            win.hide()
        }
    })

    // 线上线下环境区分
    if (isDev) {
        win.loadURL('http://localhost:3000')
    } else {
        win.loadFile(path.resolve(__dirname, '../../renderer/pages/main/index.html') )
    }
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

function show() {
    win.show()
}

function close() {
    willQuitApp = true
    win.close()
}

module.exports = { create, send, show, close }