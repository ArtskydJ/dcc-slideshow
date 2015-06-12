module.exports = function bufToBase64(ext, buffer) {
	return 'data:image/' + ext + ';base64,' + buffer.toString('base64')
}
