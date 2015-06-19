var markdownToNodes = require('./markdown-to-nodes.js')
var asyncEach = require('async-each')
var getText = require('./get-text.js')
var getImageNode = require('./get-image-node.js')
var url = require('url')
var isImage = require('is-image')

module.exports = function parseProject(projectUrlBase, songUrlBase) {

	function eachFile(fileName, next) {
		var songUrl = url.resolve(songUrlBase, fileName)
		if (isImage(fileName)) {
			next(null, getImageNode(songUrl))
		} else if (fileName) {
			getText(songUrl, function (err, mkdn) {
				next(err, !err && markdownToNodes(mkdn))
			})
		} else {
			next(null, document.createElement('div'))
		}
	}

	return function pp(projectFile, cb) {
		var projectUrl = url.resolve(projectUrlBase, projectFile)
		getText(projectUrl, function g(err, list) {
			if (err) {
				cb(err)
			} else {
				var listArray = list.split(/\r?\n/g)
				asyncEach(listArray, eachFile, function all(err, htmlChunkTree) {
					if (err) {
						cb(err)
					} else {
						console.dir(htmlChunkTree)
						var flatHtmlProject = [].concat.apply([], htmlChunkTree)
						cb(null, flatHtmlProject)
					}
				})
			}
		})
	}
}
