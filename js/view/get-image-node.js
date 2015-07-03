var elementClass = require('element-class')

module.exports = function getImg(imgSrc) {
	var div = document.createElement('div')
	div.innerHTML = '<img src="' + imgSrc.toString() + '">'
	elementClass(div).add('image-container')
	return div
}
