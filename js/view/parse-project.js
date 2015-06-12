var parseSong = require('./parse-song.js')
var each = require('async-each')
var get = require('./get.js')

module.exports = function parseProject(projectUrlBase, songUrlBase) {
	return function pp(projectFile, cb) {
		get(projectUrlBase, projectFile, function g(err, list) {
			if (err) {
				cb(err)
			} else {
				console.log(typeof list, list)
				var listArray = list.split(/\r?\n/g)
				each(listArray, function iterate(fileName, next) {
					if (fileName) {
						get(songUrlBase, fileName, next)
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
