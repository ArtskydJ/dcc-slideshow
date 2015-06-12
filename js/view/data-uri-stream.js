var map = require('through2-map')
var fileType = require('file-type')

module.exports = function DataUriStream() {
	return map(function each(chunk, i) {
		var prefix = i ? '' : 'data:' + fileType(chunk).mime + ';base64,'
		return prefix + chunk.toString('base64')
	})
}
// Publish this as a module on npm
