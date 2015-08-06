var markdownToNodes = require('./markdown-to-nodes.js')
var parallel = require('run-parallel')
var getText = require('./get-text.js')
var getImageNode = require('./get-image-node.js')
var url = require('url')
var isImage = require('is-image')

module.exports = function parseProject(projectUrlBase, songUrlBase) {

	function fileToNodes(fileName) {
		return function (next) {
			var songUrl = url.resolve(songUrlBase, fileName)
			if (isImage(fileName)) {
				next(null, getImageNode(songUrl))
			} else if (fileName) {
				getText(songUrl, function (err, text) {
					next(err, markdownToNodes(text))
				})
			} else {
				next(null, document.createElement('div'))
			}
		}
	}

	return function pp(projectFile, cb) {
		var projectUrl = url.resolve(projectUrlBase, projectFile)
		getText(projectUrl, function g(err, list) {
			if (err) {
				cb(err)
			} else {
				var tasks = list.split(/\r?\n/g).map(fileToNodes)
				parallel(tasks, function all(err, nodeTree) {
					if (err) {
						cb(err)
					} else {
						var nodeArray = [].concat.apply([], nodeTree)
						cb(null, nodeArray)
					}
				})
			}
		})
	}
}
