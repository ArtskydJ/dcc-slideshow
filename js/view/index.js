var markdownToNodes = require('./markdown-to-nodes.js')
var getText = require('./get-text.js')
var getImageNode = require('./get-image-node.js')
var url = require('url')
var isImage = require('is-image')

module.exports = function parseProject(projectUrlBase, songUrlBase) {

	function fileToNodes(fileName) {
		var songUrl = url.resolve(songUrlBase, fileName)
		if (isImage(fileName)) {
			return getImageNode(songUrl)
		} else if (fileName) {
			return getText(songUrl).then(markdownToNodes)
		} else {
			return document.createElement('div')
		}
	}

	function flatten(arrayOfArrays) {
		return [].concat.apply([], arrayOfArrays)
	}

	return function pp(projectFile) {
		var projectUrl = url.resolve(projectUrlBase, projectFile)
		return getText(projectUrl)
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
