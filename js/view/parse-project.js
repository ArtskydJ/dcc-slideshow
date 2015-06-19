var markdownToHtmlArray = require('./markdown-to-html-array.js')
var asyncEach = require('async-each')
var getText = require('./get-text.js')
var getImageHtml = require('./get-image-html.js')
var url = require('url')
var isImage = require('is-image')

module.exports = function parseProject(projectUrlBase, songUrlBase) {

	function eachFile(fileName, next) {
		var songUrl = url.resolve(songUrlBase, fileName)
		if (isImage(fileName)) {
			getImageHtml(songUrl, next)
		} else if (fileName) {
			getText(songUrl, function (err, mkdn) {
				next(err, markdownToHtmlArray(mkdn))
			})
		} else {
			next(null, '')
		}
	}

	return function pp(projectFile, cb) {
		var projectUrl = url.resolve(projectUrlBase, projectFile)
		getText(projectUrl, function g(err, list) {
			if (err) {
				cb(err)
			} else {
				console.log(typeof list, list)
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
