var hashChange = require('hash-change')
var elementClass = require('element-class')
var ParseProject = require('./parse-project.js')

var parse = ParseProject('http://localhost/test-projects/', 'http://localhost/test-songs/')

module.exports = function domSlide(element, cb) {
	parse('project.txt', function (err, nodes) {
		if (err) {
			console.error(err)
		} else {
			nodes.forEach(function (node, i) {
				node.id = i
				elementClass(node).add('hide')
				element.appendChild(node)
			})

			function loadSlide(hash) {
				var showing = element.querySelector('.show')
				elementClass(showing).remove('show')

				var toShow = document.getElementById(hash)
				elementClass(toShow).add('show')
			}
			hashChange.on('change', loadSlide)
			loadSlide(0)

			cb(nodes.length - 1)
		}
	})
}
