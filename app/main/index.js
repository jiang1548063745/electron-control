/**
 *  主进程
 */
const { app } = require('electron')
// const { create:createMainWindow } = require('./windows/main')
const { create: createControlWindow } = require('./windows/control')

const handleIPC  = require('./ipc')

app.on('ready', () => {

    // createMainWindow()

    // 创建窗口
    createControlWindow()

    // 启动 IPC 监听
    handleIPC()

    // 启动 动作监听
    require('./robot.js')()
})

//  编译 robotjs
//  npm rebuild --runtime=electron --disturl=https://atom.io/download/atom-shell --target=7.1.8 --abi=72 
//  npx electron-rebuild