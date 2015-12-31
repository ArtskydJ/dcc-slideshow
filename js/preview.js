var controls = require('./controls/index.js')
var SlideNodes = require('./view/index.js')
var elementClass = require('element-class')
var emitter = require('tab-emitter')('slides')

var rootElement = document.body
var reelElement = document.getElementById('reel')
var mainElement = document.getElementById('main')
var getSlideNodes = SlideNodes('http://localhost/test-projects/', 'http://localhost/test-songs/')

getSlideNodes('project.txt').then(function (nodes) {
	var max = nodes.length - 1
	nodes.forEach(function (node, i) {
		var clone = node.cloneNode(true)

		//elementClass(clone).add('hide')
		clone.id = 1000 + i
		reelElement.appendChild(clone)

		elementClass(node).add('hide')
		node.id = i
		mainElement.appendChild(node)
	})

	controls(rootElement, emitter, max, function (slideId) {
		elementClass(reelElement.querySelector('.show')).remove('show')
		elementClass(mainElement.querySelector('.show')).remove('show')

		elementClass(document.getElementById(1000 + slideId)).add('show')
		elementClass(document.getElementById(slideId)).add('show')
	})
}).catch(function (err) {
	throw err
})
