var hyperquest = require('hyperquest')
var concatStream = require('concat-stream')
var onetime = require('onetime')
var dataUri = require('datauri-stream')
var getMime = require('simple-mime')('application/octet-stream')

module.exports = function getImg(imgSrc) {
	var div = document.createElement('div')
	div.style.display = 'flex'
	div.style.justifyContent = 'center'
	div.style.alignItems = 'center'
	div.innerHTML = '<img src="' + imgSrc.toString() + '">'
	return div
}
