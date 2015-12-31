var getTextSlides = require('./get-nodes/text-slides.js')
var getEmptySlide = require('./get-nodes/empty-slide.js')
var getImageSlides = require('./get-nodes/image-slide.js')
var request = require('./request.js')
var url = require('url')
var isImage = require('is-image')
var each = require('async-each')

module.exports = function parseProject(projectUrlBase, songUrlBase) {

	function fileToNodes(fileName, cb) {
		var songUrl = url.resolve(songUrlBase, fileName)
		if (isImage(fileName)) {
			cb(null, getImageSlides(songUrl))
		} else if (fileName) {
			getTextSlides(songUrl, cb)
		} else {
			cb(null, getEmptySlide())
		}
	}

	function flatten(arrayOfArrays) {
		return [].concat.apply([], arrayOfArrays)
	}

	return function pp(projectFile, cb) {
		var projectUrl = url.resolve(projectUrlBase, projectFile)
		return request(projectUrl, function (err, list) {
			if (err) throw err
			each(list.split(/\r?\n/g), fileToNodes, function (err, nodes) {
				cb(err, flatten(nodes))
			})
		})
	}
}
