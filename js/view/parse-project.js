var parseSong = require('./parse-song.js')
var each = require('async-each')
var get = require('./get.js')
var url = require('url')

module.exports = function parseProject(projectUrlBase, songUrlBase) {
	return function pp(projectFile, cb) {
		var projectUrl = url.resolve(projectUrlBase, projectFile)
		get(projectUrl, function g(err, list) {
			if (err) {
				cb(err)
			} else {
				console.log(typeof list, list)
				var listArray = list.split(/\r?\n/g)
				each(listArray, function iterate(fileName, next) {
					var songUrl = url.resolve(songUrlBase, fileName)
					if (fileName) {
						get(songUrl, function (err, data) {
							console.log(songUrl, err, data)
							next(err, data)
						})
					} else {
						next(null, '')
					}
				}, function all(err, songsData) {
					if (err) {
						cb(err)
					} else {
						var htmlSongs = songsData.map(parseSong)
						console.dir(songsData)
						console.dir(htmlSongs)
						var flatHtmlProject = [].concat.apply([], htmlSongs)
						cb(null, flatHtmlProject)
					}
				})
			}
		})
	}
}
