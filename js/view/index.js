var hashChange = require('hash-change')
var projectParser = require('../parse-project/index.js')

var PROJECT_URL = 'http://localhost/test-content/project.txt'
var SONGS_URL = 'http://localhost/test-content/'

module.exports = function domSlide(element) {
	projectParser(PROJECT_URL, SONGS_URL, function (err, htmlSlides) {
		if (err) {
			console.error(err)
		} else {
			hashChange.on('change', function (hash) {
				element.innerHTML = htmlSlides[hash]
			})
		}
	})
}
