require('array.prototype.find')
var parseSlide = require('./parse-slide.js')
var inheritHeaders = require('./inherit-headers.js')
var toHtml = require('./to-html.js')

var SLIDE_BREAK_RE = /\s*^-{3,}$\s*/gm

module.exports = function parse(markdown) {
	return markdown
		.split(SLIDE_BREAK_RE)
		//.filter(Boolean) // Remove empty slides
		.map(parseSlide)
		.map(inheritHeaders)
		.map(toHtml)
}
