var fs = require('fs')
var path = require('path')

var srcPath = path.join(__dirname, 'fodp')
var destPath = path.join(__dirname, 'txt')

function byLength(str1, str2) {
	var length1 = str1 ? str1.length : 0
	var length2 = str2 ? str2.length : 0
	return length2 - length1
}

function getTextFromFrame(frame) {
	return (frame.match(/>(.+) ?<\//g) || [])
		.map(str => str.replace(/<[^>]+>|^>| ?<\/$|&lt;number&gt;/g, '')) // Clean rough content
		.filter(Boolean)
		.join('\r\n')
}

function getTextFromPage(page) {
	var unsortedFrames = page
		.replace(/\xA0/g, ' ') // Replace &nbsp; with " "
		.replace(/&apos;|’/g, '\'') // Fix apostrophes
		.replace(/[^©A-Za-z0-9\r\n\.!,;: '"\/#\(\)>?&—…\[\]-]/g, '') // Get rid of unknown characters
		.split(/<\/?draw:(frame|custom-shape)>/)
		.map(frame => frame.replace(/<text:line-break\/>/g, '\n')) // Break frame correctly
		.map(getTextFromFrame)
	var frames = unsortedFrames.slice().sort(byLength)

	var title = unsortedFrames[0]
	var header = (title !== lastHeader) ? '# ' + (lastHeader = title) + '\r\n\r\n' : ''

	var content = frames[0]

	var footer = frames.slice(1).filter(function (str) { return str !== title })[0]
	footer = footer ? '\r\n\r\n> ' + footer.replace(/(\. *)?\r\n/g, '. ') : ''

	return header + content + footer + '\r\n'
}


var lastHeader = ''
function processFile(filename) {
	lastHeader = ''

	var song =
		fs.readFileSync(path.join(srcPath, filename), 'utf8')
		.slice(contents.indexOf('<office:body>')) // remove anything before "<office:body>"
		.split(/<\/draw:page>\s*<draw:page/)
		.map(getTextFromPage)
		.join('\r\n-----\r\n\r\n')

	fs.writeFileSync(path.join(destPath, filename), song)
}

fs.readdirSync(srcPath)
	.filter(filename => filename.endsWith('.txt'))
	.forEach(processFile)
