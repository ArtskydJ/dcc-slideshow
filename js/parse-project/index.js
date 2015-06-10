var parseSong = require('./parse-song.js')
var urlResolve = require('url').resolve
var each = require('async-each')
var get = require('hyperquestionable')

module.exports = function parseProject(projectUrl, songUrlBase, cb) {
	get(projectUrl, function g(err, r, list) {
		if (err) {
			cb(err)
		} else {
			console.log(typeof list)
			console.log(list)
			var listArray = list.split(/\r?\n/g)
			var fileNames = listArray.filter(Boolean)
			each(fileNames, function iterate(fileName, next) {
				var resolvedUrl = urlResolve(songUrlBase, fileName)
				get(resolvedUrl, function (err, r, songData) {
					next(err, songData)
				})
			}, function all(err, songsData) {
				if (err) {
					cb(err)
				} else {
					var htmlSongs = songsData.map(parseSong)
					var songIndex = 0
					var htmlProject = listArray.map(function (fileName) {
						return fileName && htmlSongs[songIndex++]
					})
					var flatHtmlProject = [].concat.apply([], htmlProject)
					cb(null, flatHtmlProject)
				}
			})
		}
	})
}
