/**
 * Ipc通信
 */
const { ipcMain } = require('electron')
const { create: createControlWindow, send: sendControlWindow } = require('./windows/control')
const { send: sendMainWindow } = require('./windows/main')
const signal = require('./signal')

module.exports = function() {

    // 注册
    ipcMain.handle('login', async() => {
        let { code } = await signal.invoke('login', null, 'logined')
        return code
    })

    // 发器控制
    ipcMain.on('control', async (e, remote) => {
        signal.send('control', { remote })
    })

    // 控制中
    signal.on('controlled', (data) => {
        createControlWindow()
        sendMainWindow('control-state-change', data.remote, 1)
    })

    // 被控制
    signal.on('be-controlled', (data) => {
        sendMainWindow('control-state-change', data.remote, 2)
    })

    // 转发 (puppet、control共享的信道)
    ipcMain.on('forward', (e, event, data) => {
        signal.send('forward', { event, data })
    })

    // 收到offer，puppet响应
    signal.on('offer', (data) => {
        sendMainWindow('offer', data)
    })

    // 收到puppet证书，answer响应
    signal.on('answer', (data) => {
        sendControlWindow('answer', data)
    })

    // 收到control证书，puppet响应
    signal.on('puppet-candidate', (data) => {
        sendControlWindow('candidate', data)
    })

    // 收到puppet证书，control响应
    signal.on('control-candidate', (data) => {
        sendMainWindow('candidate', data)
    })
}