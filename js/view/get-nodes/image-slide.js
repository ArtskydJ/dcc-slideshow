var elementClass = require('element-class')

module.exports = function getImg(imgSrc) {
	var div = document.createElement('div')
	div.innerHTML = '<img src="' + imgSrc.toString() + '">'
	var classes = elementClass(div)
	classes.add('slide-container')
	classes.add('image-container')
	return div
}
