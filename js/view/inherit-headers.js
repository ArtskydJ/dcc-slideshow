function getHeader(slide) {
	return (slide && slide.header) || ''
}

function mostRecentHeader(arr, i) {
	return getHeader(arr.slice(0, i).reverse().find(getHeader))
}

module.exports = function inheritHeaders(slide, i, arr) {
	slide.header = getHeader(slide) || mostRecentHeader(arr, i)
	return slide
}
