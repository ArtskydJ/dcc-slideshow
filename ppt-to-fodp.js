var cp = require('child_process')
var fs = require('fs')
var path = require('path')
var each = require('async-each')

function isPowerPoint(filename) {
	return filename.lastIndexOf('.ppt') === filename.length - 4
}

var pptFilenames = fs.readdirSync(path.join(__dirname, '..', 'ppt'))
var convertedFilenames = fs.readdirSync(__dirname)
var validFilenames = pptFilenames
	.filter(isPowerPoint)
	.filter(function (filename) {
		return convertedFilenames.indexOf(filename.replace(/\.ppt$/, '.fodp')) === -1
	})

function loop(validFilenames) {
	if (validFilenames.length) {
		cp.execFile('soffice.exe', [ '--convert-to', 'fodp', '..\\ppt\\' + validFilenames.pop() ], function (err) {
			if (err) throw err
			loop(validFilenames)
		})
	}
}
loop(validFilenames)

// This file was originally in ./fodp, so it will need to be modified to run from ./
// Maybe it was written that way because of cp.execFile? But I think it can take a cwd option.
