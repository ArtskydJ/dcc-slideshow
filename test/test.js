var parseSong = require('../js/parse-song/index.js')
var fs = require('fs')

var songFile = fs.readFileSync(__dirname + '/amazing-grace.md', { encoding: 'utf8' })

// parseSong(songFile).forEach(displaySlide)
parseSong(songFile).forEach(console.log)

function displaySlide(slide, i) {
	if (i) console.log('-----')
	console.log(
		slide.header +
		'\n\t' + slide.lyrics.slice(0, 15) + '...\n' +
		slide.footer
	)
}
