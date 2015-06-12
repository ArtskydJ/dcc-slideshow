var hyperquest = require('hyperquest')
var concat = require('concat-stream')
var url = require('url')
var textExtensions = require('text-extensions')
var path = require('path')

module.exports = function get(urlBase, urlFile, cb) {
	var ext = path.extname(urlFile).slice(1)
	var enc = (textExtensions.indexOf(ext) !== -1) ? 'string' : 'buffer'

	var resolved = url.resolve(urlBase, urlFile)
	hyperquest(resolved, function(err, res) {
		if (err) {
			cb(err)
		} else {
			res.pipe(concat({ encoding: enc }, function (data) {
				cb(null, data)
			}))
			res.on('error', function (er) {
				throw er
			})
		}
	})
}
