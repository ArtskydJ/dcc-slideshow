var fs = require('fs')
var path = require('path')
var openr = require('opener')

var srcPath = path.join(__dirname, 'txt')

var REGEX = /[^©A-Za-z0-9\r\n\.!,;: '"\/#\(\)>?&—…\[\]-]/g

fs.readdirSync(srcPath)
	.filter(filename => REGEX.test( fs.readFileSync(path.join(srcPath, filename), 'utf8') ))
	.forEach(filename => openr(path.join(srcPath, filename)) )
