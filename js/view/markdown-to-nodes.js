require('array.prototype.find')
var inheritHeaders = require('./inherit-headers.js')
var elementClass = require('element-class')

var SLIDE_BREAK_RE = /\s*^-{3,}$\s*/gm
var SLIDE_PIECES_RE = /^(?:# (.+))?(?:\r?\n)*([^>]+)(?:> (.+))?(\r?\n)*$/

module.exports = function parse(markdown) {
	return markdown
		.split(SLIDE_BREAK_RE)
		.filter(Boolean) // Remove empty slides
		.map(parseSlide)
		.filter(Boolean) // Remove empty slides
		.map(inheritHeaders)
		.map(toNode)
}

function parseSlide(slide) {
	var x = SLIDE_PIECES_RE.exec(slide)
	return x && {
		header: x[1] || '',
		lyrics: x[2] || '',
		footer: x[3] || ''
	}
}

function toNode(slide) {
	var div = document.createElement('div')
	elementClass(div).add('slide-container')
	div.innerHTML = (
		'<div class="header">' + slide.header + '</div>' +
		'<div class="lyrics">\n' +
		'\t' + slide.lyrics.replace(/\r?\n/g, '<br>\t') +
		'\n</div>\n' +
		'<div class="footer">' + slide.footer + '</div>'
	)
	return div
}
