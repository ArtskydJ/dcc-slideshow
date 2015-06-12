var hyperquest = require('hyperquest')
var concatStream = require('concat-stream')
var url = require('url')
var onetime = require('onetime')
var DataUriStream = require('./data-uri-stream.js')
var isImage = require('is-image')

module.exports = function get(urlBase, urlFile, callback) {
	var cb = onetime(callback)
	var resolved = url.resolve(urlBase, urlFile)
	hyperquest(resolved, function(err, res) {
		if (err) {
			cb(err)
		} else {
			var concat = concatStream({ encoding: 'string' }, function (data) {
				cb(null, data)
			})
			if (isImage(urlFile)) {
				res.pipe(DataUriStream()).pipe(concat)
			} else {
				res.pipe(concat)
			}
			res.on('error', cb)
		}
	})
}
