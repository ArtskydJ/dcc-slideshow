var hyperquest = require('hyperquest')
var concat = require('concat-stream')
var url = require('url')
var onetime = require('onetime')
var ImageStream = require('./image-stream.js')

module.exports = function get(urlBase, urlFile, callback) {
	var cb = onetime(callback)
	var resolved = url.resolve(urlBase, urlFile)
	hyperquest(resolved, function(err, res) {
		if (err) {
			cb(err)
		} else {
			res.pipe(ImageStream(urlFile))
				.pipe(concat({ encoding: 'string' }, function (data) {
					cb(null, data)
				}))
			res.on('error', cb)
		}
	})
}
