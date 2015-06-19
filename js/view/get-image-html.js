var hyperquest = require('hyperquest')
var concatStream = require('concat-stream')
var onetime = require('onetime')
var dataUri = require('datauri-stream')
var getMime = require('simple-mime')('application/octet-stream')

module.exports = function get(url, callback) {
	callback(null, toHtml(url))
	/*
	var cb = onetime(callback)
	hyperquest(url, function(err, res) {
		if (err) {
			cb(err)
		} else {
			var concat = concatStream({ encoding: 'buffer' }, function (data) {
				cb(null, toHtml(data))
			})
			var opts = { mime: getMime(url) }
			res.pipe(dataUri(opts)).pipe(concat)
			res.on('error', cb)
		}
	})*/
}

function toHtml(imgSrc) {
	return (
		'<div style="display:flex;justify-content:center;align-items:center;">' +
			'<img src="' + imgSrc.toString() + '">' +
		'</div>'
	)
}
