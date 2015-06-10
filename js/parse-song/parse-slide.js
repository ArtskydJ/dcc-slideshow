var SLIDE_PIECES_RE = /^(?:# (.+))?(?:\r?\n)*([^>]+)(?:> (.+))?(\r?\n)*$/

module.exports = function parseSlide(slide) {
	var x = SLIDE_PIECES_RE.exec(slide)
	return x && {
		header: x[1] || '',
		lyrics: x[2] || '',
		footer: x[3] || ''
	}
}
