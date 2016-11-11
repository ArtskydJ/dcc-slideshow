var cp = require('child_process')
var fs = require('fs')
var path = require('path')

var sofficePath = 'C:\\Program Files (x86)\\LibreOffice 5\\program\\soffice.exe'
var srcPath = path.join(__dirname, 'ppt')
var destPath = path.join(__dirname, 'fodp')

var pptFilenames = fs.readdirSync(srcPath)
var convertedFilenames = fs.readdirSync(destPath)
var validFilenames = pptFilenames
	.filter(filename => filename.endsWith('.ppt'))
	.filter(filename => !convertedFilenames.includes(filename.replace(/\.ppt$/, '.fodp')) )

function loop(validFilenames) {
	if (validFilenames.length) {
		var sofficeArgs = [
			'--convert-to',
			'fodp',
			path.resolve(srcPath, validFilenames.pop())
		]
		console.log(sofficeArgs[2])
		cp.execFile(sofficePath, sofficeArgs, { cwd: destPath }, err => {
			if (err) throw err
			loop(validFilenames)
		})
	}
}
loop(validFilenames)
