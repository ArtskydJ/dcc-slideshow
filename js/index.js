var controls = require('./controls/index.js')
var SlideNodes = require('./view/index.js')
var elementClass = require('element-class')
var emitter = require('tab-emitter')('slides')

var rootElement = document.body
var mainElement = document.getElementById('main')
var reelElement = document.getElementById('reel')
var getSlideNodes = SlideNodes('http://localhost:9966/public/test-projects/', 'http://localhost:9966/public/test-songs/')

getSlideNodes('project.txt', function (err, nodes) {
	if (err) throw err
	var max = nodes.length - 1
	nodes.forEach(function (node, i) {
		if (reelElement) {
			var clone = node.cloneNode(true)
			clone.id = 1000 + i
			reelElement.appendChild(clone)
		}

		node.id = i
		// node.style['z-index'] = i
		mainElement.appendChild(node)
	})

	controls(rootElement, emitter, max, function (slideId) {
		var nodes = rootElement.querySelectorAll('.show')
		;[].slice.call(nodes).forEach(function (node) {
			elementClass(node).remove('show')
		})

		if (reelElement) {
			elementClass(document.getElementById(1000 + slideId)).add('show')
		}
		elementClass(document.getElementById(slideId)).add('show')
	})
})
