var fs = require('fs')
var path = require('path')

fs.readdirSync(path.join(__dirname, 'txt')).forEach(function (filename) {
	var realPath = path.join(__dirname, 'txt', filename)
	var contents = fs.readFileSync(realPath, 'utf8')

	// Had some issues with non-breaking spaces. (Char code 160, hex A0.)
	// This finds occurrences of non-breaking spaces and replaces them with normal spaces.
	if (contents.indexOf(String.fromCharCode(160)) !== -1) {
		fs.writeFileSync(realPath, contents.replace(/\xA0/g, ' '))
		console.log('Fixed ' + filename)
	}
})
