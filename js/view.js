var hashChange = require('hash-change')

module.exports = function domSlide(element) {
	hashChange.on('change', function (hash) {
		console.log('hash is', hash)
		element.innerHTML += ' slide ' + hash + '<br>'
	})
}
