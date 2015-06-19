var hashChange = require('hash-change')
var ParseProject = require('./parse-project.js')

var parse = ParseProject('http://localhost/test-projects/', 'http://localhost/test-songs/')

module.exports = function domSlide(element) {
	parse('project.txt', function (err, nodes) {
		if (err) {
			console.error(err)
		} else {
			nodes.forEach(function (node) {
				element.appendChild(node)
			})

			/*function loadSlide(hash) {
				element.innerHTML = htmlSlides[hash]
			}
			hashChange.on('change', loadSlide)
			loadSlide(0)*/
		}
	})
}
