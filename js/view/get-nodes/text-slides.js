var request = require('../request.js')
var inheritHeaders = require('./inherit-headers.js')
var elementClass = require('element-class')

var SLIDE_BREAK_RE = /\s*^-{3,}$\s*/gm
var SLIDE_PIECES_RE = /^(?:# (.+))?\s*([^>]+?)\s*(?:> (.+))?\s*$/

module.exports = function getMarkdownFromUrl(songUrl, cb) {
	return request(songUrl, function (err, markdown) {
		cb(err, parse(markdown))
	})
}

function parse(markdown) {
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
	div.innerHTML = (
		'<div class="header">' + slide.header + '</div>' +
		'<div class="lyrics">\n' +
		'\t' + slide.lyrics.replace(/\r?\n/g, '<br>\t') +
		'\n</div>\n' +
		'<div class="footer">' + slide.footer + '</div>'
	)
	var classes = elementClass(div)
	classes.add('slide-container')
	classes.add('text-container')
	return div
}
