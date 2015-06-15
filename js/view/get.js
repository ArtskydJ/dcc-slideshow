var hyperquest = require('hyperquest')
var concat = require('concat-stream')
var dataUri = require('datauri-stream')
var onetime = require('onetime')
var isImage = require('is-image')
var getMime = require('simple-mime')('application/octect-stream')

module.exports = function get(url, callback) {
	var cb = onetime(callback)
	hyperquest(url, function(err, res) {
		if (err) {
			cb(err)
		} else {
			var concatStr = concat({ encoding: 'string' }, function (data) {
				cb(null, data)
			})
			if (isImage(url)) {
				var opts = { mime: getMime(url) }
				res.pipe(dataUri(opts)).pipe(concatStr)
			} else {
				res.pipe(concatStr)
			}
			res.on('error', cb)
		}
	})
}
