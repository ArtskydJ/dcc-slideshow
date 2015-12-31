var controls = require('./controls/index.js')
var SlideNodes = require('./view/index.js')
var elementClass = require('element-class')
var emitter = require('tab-emitter')('slides')

var rootElement = document.body
var mainElement = document.body
if (window.PREVIEW_MODE) {
	var reelElement = document.getElementById('reel')
	mainElement = document.getElementById('main')
}
var getSlideNodes = SlideNodes('http://localhost/test-projects/', 'http://localhost/test-songs/')

getSlideNodes('project.txt').then(function (nodes) {
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
		elementClass(rootElement.querySelector('.show')).remove('show')

		if (window.PREVIEW_MODE) {
			elementClass(document.getElementById(1000 + slideId)).add('show')
		}
		elementClass(document.getElementById(slideId)).add('show')
	})
}).catch(function (err) {
	throw err
})
