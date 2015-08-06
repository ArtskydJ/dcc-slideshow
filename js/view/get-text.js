var xhr = require('xhr')

module.exports = function (url) {
	return new Promise(function (fulfill, reject) {
		xhr(url, function (err, res, body) {
			if (err) {
				reject(err)
			} else if (res.statusCode < 200 || res.statusCode >= 300) {
				reject(new Error('Recieved non-2xx status code: ' + res.statusCode))
			} else {
				fulfill(body || '')
			}
		})
	})
}
