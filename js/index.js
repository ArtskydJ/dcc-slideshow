var controls = require('./controls/index.js')
var SlideNodes = require('./view/index.js')
var elementClass = require('element-class')
var emitter = require('tab-emitter')('slides')

var rootElement = document.body
var mainElement = document.getElementById('main')
if (window.PREVIEW_MODE) {
	var reelElement = document.getElementById('reel')
}
var getSlideNodes = SlideNodes('http://localhost/test-projects/', 'http://localhost/test-songs/')

getSlideNodes('project.txt', function (err, nodes) {
	if (err) throw err
	var max = nodes.length - 1
	nodes.forEach(function (node, i) {
		if (window.PREVIEW_MODE) {
			var clone = node.cloneNode(true)
			clone.id = 1000 + i
			reelElement.appendChild(clone)
		}

		elementClass(node).add('hide')
		node.id = i
		mainElement.appendChild(node)
	})

	controls(rootElement, emitter, max, function (slideId) {
		var nodes = rootElement.querySelectorAll('.show')
		;[].slice.call(nodes).forEach(function (node) {
			elementClass(node).remove('show')
		})

		if (window.PREVIEW_MODE) {
			elementClass(document.getElementById(1000 + slideId)).add('show')
		}
		elementClass(document.getElementById(slideId)).add('show')
	})
})
