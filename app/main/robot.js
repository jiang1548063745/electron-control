const { ipcMain } = require('electron')
const robot = require('robotjs')
const vkey = require('vkey')

/**
 * 处理鼠标事件
 * @param {*} data 
 */
function handleMouse(data) {
    const { clientX, clientY, screen, video } = data

    let x = clientX * screen.width / video.width
    let y = clientY * screen.height / video.heigth

    console.log(x, y)

    robot.moveMouse(x, y)
    robot.mouseClick()
}

/**
 * 处理键盘事件
 * @param {*} data 
 */
function handleKey(data) {
    let modifyers = []

    if (data.meta) modifyers.push('meta')

    if (data.shift) modifyers.push('shift')

    if (data.alt) modifyers.push('alt')

    if (data.ctrl) modifyers.push('ctrl')

    let key = vkey[data.keyCode].toLowerCase()

    robot.keyTap[key, modifyers]

    // if(key[0] !== '<') { //<shift>
    //     robot.keyTap(key, modifiers)
    // }
}

module.exports = function() {
    // 监听 ROBOT 相关动作
    ipcMain.on('robot', (e, type, data) => {
        console.log('handle', type, data)

        if (type === 'mouse') {
            handleMouse(data)
        } else if (type === 'key') {
            handleKey(data)
        }
    })
}