require('array.prototype.find')

function getHeader(slide) {
	return (slide && slide.header) || ''
}

module.exports = function inheritHeaders(slide, i, arr) {
	slide.header = (
		getHeader(slide) ||
		getHeader(arr.slice(0, i).reverse().find(getHeader)) // Find most recent
	)
	return slide
}
