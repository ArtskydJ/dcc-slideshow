// Had some issues with non-breaking spaces. (Char code 160, hex A0.)
// This finds occurrences of non-breaking spaces and replaces them with normal spaces.

var fs = require('fs')
var path = require('path')

var srcPath = path.join(__dirname, 'txt')
var destPath = path.join(__dirname, 'txt')

fs.readdirSync(srcPath)
	.map(filename => ({ filename, contents: fs.readFileSync(path.join(srcPath, filename), 'utf-8') }))
	.filter(({ contents }) => contents.includes(String.fromCharCode(160)))
	.forEach(({ contents, filename }) => {
		writeFile(filename, fs.writeFileSync(path.join(destPath, filename), contents.replace(/\xA0/g, ' ')))
		console.log('Fixed ' + filename)
	})
