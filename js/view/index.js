var hashChange = require('hash-change')
var ProjectParser = require('../parse-project/index.js')

var pp = ProjectParser('http://localhost/test-projects/', 'http://localhost/test-songs/')

module.exports = function domSlide(element) {
	pp('project.txt', function (err, htmlSlides) {
		if (err) {
			console.error(err)
		} else {
			hashChange.on('change', function (hash) {
				element.innerHTML = htmlSlides[hash]
			})
		}
	})
}
