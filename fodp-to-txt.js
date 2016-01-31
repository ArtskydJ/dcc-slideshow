var fs = require('fs')
var path = require('path')

var lastHeader = ''

function normalizeApostrophes(str) {
	return str.replace(/&apos;|’/g, '\'')
}

function byLength(str1, str2) {
	var length1 = str1 ? str1.length : 0
	var length2 = str2 ? str2.length : 0
	return length2 - length1
}

function breakFrameCorrectly(frame) {
	return frame.replace(/<text:line-break\/>/g, '\n')
}

function cleanRoughContent(str) {
	return str.replace(/<[^>]+>|^>| ?<\/$|&lt;number&gt;/g, '')
}

function getTextFromFrame(frame) {
	return (frame.match(/>(.+) ?<\//g) || [])
		.map(cleanRoughContent)
		.filter(Boolean)
		.join('\r\n')
}

function getTextFromPage(page) {
	var unsortedFrames = page
		.split(/<\/?draw:(frame|custom-shape)>/)
		.map(breakFrameCorrectly)
		.map(getTextFromFrame)
		.map(normalizeApostrophes)
	var frames = unsortedFrames.slice().sort(byLength)

	var title = unsortedFrames[0]
	var header = (title !== lastHeader) ? '# ' + (lastHeader = title) + '\r\n\r\n' : ''

	var content = frames[0]

	var footer = frames.slice(1).filter(function (str) { return str !== title })[0]
	footer = footer ? '\r\n\r\n> ' + footer.replace(/(\. *)?\r\n/g, '. ') : ''

	return header + content + footer + '\r\n'
}

function isExtension(expect) {
	expect = ('.' + expect).replace('..', '.')
	return function(filename) {
		return filename.lastIndexOf(expect) === filename.length - expect.length
	}
}

function processFile(filename) {
	var contents = fs.readFileSync(path.join(__dirname, 'fodp', filename), 'utf8')
	contents = contents.slice(contents.indexOf('<office:body>')) // remove anything before "<office:body>"
	var song = contents
		.split(/<\/draw:page>\s*<draw:page/)
		.map(getTextFromPage)
		.join('\r\n-----\r\n\r\n')
	fs.writeFileSync(path.join(__dirname, 'txt', filename), song)
}

fs.readdirSync(path.join(__dirname, 'fodp'))
	.filter(isExtension('txt'))
	.forEach(processFile)
