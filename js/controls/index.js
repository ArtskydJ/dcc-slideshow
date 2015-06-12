var fullscreenOnce = require('./fullscreen-once.js')
var domEvent = require('dom-event')
var keyEvent = require('key-event')
var keymap = require('./keymap.json')

var tryFull = fullscreenOnce(document.body)
var modifiers = {
	prev: function prev(x, max) { return Math.max(0, x - 1) },
	next: function next(x, max) { return Math.min(x + 1, max) },
	first: function fst(x, max) { return 0 },
	last: function last(x, max) { return max }
}

module.exports = function slideChange(ele) {
	if (!ele) throw new Error('Must provide an element to slide-change.js')
	var maxSlideIndex = 99

	function modifyIndex(action) {
		// tryFull() // Annoying in dev...
		var curr = Number(window.location.hash.slice(1))
		var modify = modifiers[action]
		window.location.hash = modify(curr, maxSlideIndex)
	}

	/* Annoying in dev
	domEvent(ele, 'click', function (ev) {
		modifyIndex('next')
	})*/

	Object.keys(keymap).forEach(function (action) {
		keymap[action].forEach(function (key) {
			keyEvent(ele, key, function () {
				modifyIndex(action)
			})
		})
	})

	modifyIndex('first')
}
