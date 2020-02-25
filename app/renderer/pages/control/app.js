const peer = require('./peer-control')

peer.on('add-stream', (stream) => {
    play(stream)
})

/**
 * 播放
 * @param {*} stream  流
 */
function play(stream) {
    let video = document.getElementById('screen-video')
    video.srcObject = stream

    video.onloadedmetadata = function() {
        video.play()
    }
}