var fullscreenOnce = require('./fullscreen-once.js')
var domEvent = require('dom-event')
var keyEvent = require('key-event')
var keymap = require('./keymap.json')

var PROD = false

var tryFull = fullscreenOnce(document.body)
var modifiers = {
	prev: function prev(x, max) { return Math.max(0, x - 1) },
	next: function next(x, max) { return Math.min(x + 1, max) },
	first: function fst(x, max) { return 0 },
	last: function last(x, max) { return max }
}

module.exports = function slideChange(ele, emitter, maxSlideIndex, onChange) {
	if (!ele) throw new Error('Must provide an element to slide-change.js')

	if (PROD) domEvent(ele, 'click', function (ev) {
		modifyIndex('next')
	})

	Object.keys(keymap).forEach(function (action) {
		keymap[action].forEach(function (key) {
			keyEvent(ele, key, function () {
				modifyIndex(action)
			})
		})
	})

	function modifyIndex(action) {
		if (PROD) tryFull()
		emitter.emit('slide', action)
	}

	var index = -1
	emitter.on('slide', function (action) {
		var prevIndex = index
		index = modifiers[action](index, maxSlideIndex)
		if (prevIndex !== index) {
			onChange(index)
		}
	})

	modifyIndex('first')
}
