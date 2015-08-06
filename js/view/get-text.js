var xhr = require('xhr')

module.exports = function (url, cb) {
	xhr(url, function (err, res, body) {
		if (err) {
			cb(err)
		} else if (res.statusCode < 200 || res.statusCode >= 300) {
			cb(new Error('Recieved non-2xx status code: ' + res.statusCode))
		} else {
			cb(null, body)
		}
	})
}
