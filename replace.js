var fs = require('fs')
var path = require('path')

fs.readdirSync(path.join(__dirname, 'txt')).forEach(function (filename) {
	var realPath = path.join(__dirname, 'txt', filename)
	var contents = fs.readFileSync(realPath, 'utf8')
	if (contents.indexOf(' ') !== -1) {
		fs.writeFileSync(realPath, contents.replace(/ /g, ' '))
		console.log('Fixed ' + filename)
	}
})
