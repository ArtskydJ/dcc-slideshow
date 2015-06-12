var hashChange = require('hash-change')
var ParseProject = require('./parse-project.js')

var parse = ParseProject('http://localhost/test-projects/', 'http://localhost/test-songs/')

module.exports = function domSlide(element) {
	parse('project.txt', function (err, htmlSlides) {
		if (err) {
			console.error(err)
		} else {
			hashChange.on('change', function (hash) {
				element.innerHTML = htmlSlides[hash]
			})
		}
	})
}
