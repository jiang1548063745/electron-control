const EventEmitter = require('events')
const peer = new EventEmitter()
const { ipcRenderer, desktopCapturer } = require('electron')

async function getScreenStream() {
    const source = await desktopCapturer.getSources({
        types: ['screen']
    })

    navigator.webkitGetUserMedia({
        audio: false,
        video: {
            mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: source[0].id,
                maxWidth: window.screen.width,
                maxHeight: window.screen.height
            }
        }
    }, (stream) => {
        peer.emit('add-stream', stream)
    }, (err) => {
        // handle err
        console.log(err)
    })
}

getScreenStream()

/**
 * 监听 robot 响应
 */
peer.on('robot', (type, data) => {
    if (type === 'mouse') {
        data.screen = { width: window.screen.width, height: window.screen.height }
    }

    ipcRenderer.send('robot', type, data)
})

module.exports = peer