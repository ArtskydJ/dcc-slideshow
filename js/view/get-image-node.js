var hyperquest = require('hyperquest')
var concatStream = require('concat-stream')
var onetime = require('onetime')
var dataUri = require('datauri-stream')
var getMime = require('simple-mime')('application/octet-stream')
var elementClass = require('element-class')

module.exports = function getImg(imgSrc) {
	var div = document.createElement('div')
	div.innerHTML = '<img src="' + imgSrc.toString() + '">'
	elementClass(div).add('image-container')
	console.log(div.className)
	return div
}
