var getTextSlides = require('./get-nodes/text-slides.js')
var getEmptySlide = require('./get-nodes/empty-slide.js')
var getImageSlides = require('./get-nodes/image-slide.js')
var request = require('./request.js')
var url = require('url')
var isImage = require('is-image')

module.exports = function parseProject(projectUrlBase, songUrlBase) {

	function fileToNodes(fileName) {
		var songUrl = url.resolve(songUrlBase, fileName)
		if (isImage(fileName)) {
			return getImageSlides(songUrl)
		} else if (fileName) {
			return getTextSlides(songUrl)
		} else {
			return getEmptySlide()
		}
	}

	function flatten(arrayOfArrays) {
		return [].concat.apply([], arrayOfArrays)
	}

	return function pp(projectFile) {
		var projectUrl = url.resolve(projectUrlBase, projectFile)
		return request(projectUrl)
			.then(function g(list) {
				var proms = list.split(/\r?\n/g).map(fileToNodes)
				return Promise.all(proms)
			})
			.then(flatten)
			.catch(function (err) {
				throw err
			})
	}
}
