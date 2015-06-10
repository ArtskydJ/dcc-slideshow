var fullscreen = require('fullscreen')
var onetime = require('onetime')

module.exports = function fullscreenOnce(ele) {
	var f = fullscreen(ele)
	f.on('error', console.error.bind(console, 'Could not full screen!'))
	return onetime(f.request)
}
