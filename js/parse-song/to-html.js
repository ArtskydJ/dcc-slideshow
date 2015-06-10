module.exports = function htmlify(slide) {
	return [
		'<div class="header">' + slide.header + '</div>',
		'<div class="lyrics">',
		'\t' + slide.lyrics.replace(/\r?\n/g, '<br>\t'),
		'</div>',
		'<div class="footer">' + slide.footer + '</div>',
	].join('\n')
}


/*
<div class="header">
	Amazing Grace
</div>
<div class="lyrics">
	Amazing Grace, how sweet the sound,<br>
	that saved a wretch like me.<br>
	I once was lost, but now I&#39;m found<br>
	was blind, but now I see.
</div>
<div class="footer">
	Public Domain (maybe)
</div>
*/
