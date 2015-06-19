var hyperquest = require('hyperquest')
var concat = require('concat-stream')
var onetime = require('onetime')

module.exports = function get(url, callback) {
	var cb = onetime(callback)
	hyperquest(url, function(err, res) {
		if (err) {
			cb(err)
		} else {
			res.pipe(concat({ encoding: 'string' }, function (data) {
				cb(null, data)
			}))
			res.on('error', cb)
		}
	})
}
