var hyperquest = require('hyperquest')
var concat = require('concat-stream')
var url = require('url')

module.exports = function get(urlBase, urlFile, cb) {
	var resolved = url.resolve(urlBase, urlFile)
	hyperquest(resolved, function(err, res) {
		if (err) {
			cb(err)
		} else {
			res.pipe(concat(function (data) {
				cb(null, data)
			}))
			res.on('error', function (er) {
				throw er
			})
		}
	})
}
