var parseSong = require('./parse-song.js')
var each = require('async-each')
var get = require('./get.js')

module.exports = function parseProject(projectUrlBase, songUrlBase) {
	return function pp(projectFile, cb) {
		get(projectUrlBase, projectFile, function g(err, list) {
			if (err) {
				cb(err)
			} else {
				console.log(list)
				var listArray = list.split(/\r?\n/g)
				var fileNames = listArray.filter(Boolean)
				each(fileNames, function iterate(fileName, next) {
					get(songUrlBase, fileName, next)
				}, function all(err, songsData) {
					if (err) {
						cb(err)
					} else {
						songsData.forEach(function (song) {console.log(typeof song, song)})
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
}
