var map = require('through2-map')
var path = require('path')
var imageExts = require('image-extensions')

module.exports = function ImageStream(fileName) {
	var ext = path.extname(fileName).slice(1).toLowerCase()
	var isImage = imageExts.indexOf(ext) !== -1

	return isImage ?
		map(function each(chunk, i) {
			var content = chunk.toString('base64')
			return (i==0) ?
				('data:image/' + ext + ';base64,' + content) :
				content
		}) :
		map(function each(chunk) {
			return chunk.toString()
		})
}

// Publish this as a module on npm
