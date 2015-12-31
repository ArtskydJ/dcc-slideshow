var elementClass = require('element-class')

module.exports = function getEmptySlideNodes() {
	var div = document.createElement('div')
	var classes = elementClass(div)
	classes.add('slide-container')
	classes.add('empty-container')
	return div
}
