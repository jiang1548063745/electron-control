const peer = require('./peer-control')

peer.on('add-stream', (stream) => {
    play(stream)
})

let video = document.getElementById('screen-video')

/**
 * 播放
 * @param {*} stream  流
 */
function play(stream) {
    video.srcObject = stream
    video.onloadedmetadata = function() {
        video.play()
    }
}

/**
 * 键盘按键
 */
window.onkeydown = function(e) {
    let data = {
        keyCode: e.keyCode,
        shift: e.shiftKey,
        meta: e.metaKey,
        control: e.ctrlKey,
        alt: e.altKey
    }

    peer.emit('robot', 'key', data)
}

/**
 * 鼠标点击
 */
window.onmouseup = function(e) {
    let data = {
        clientX: e.clientX,
        clientY: e.clientY,
        video: {
            // width: video.getBoundingClientRect().width,
            // height: video.getBoundingClientRect().height
            width: video.width,
            height: video.height
        }
    }

    peer.emit('robot', 'mouse', data)
}