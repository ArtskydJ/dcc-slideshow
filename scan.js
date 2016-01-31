var fs = require('fs')
var path = require('path')
var openr = require('opener')

var REGEX = /[^©A-Za-z0-9\r\n\.!,;: '"\/#\(\)>?&—…\[\]-]/g

fs.readdirSync(path.join(__dirname, 'txt')).filter(function (filename) {
	var contents = fs.readFileSync(path.join(__dirname, 'txt', filename), 'utf8')
	return REGEX.test(contents)
}).forEach(function (filename) {
	// console.log('Has special chars ' + filename + ' -> ' + contents.match(REGEX).join())
	openr(path.join(__dirname, 'txt', filename))
})
