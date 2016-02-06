dcc-slideshow
=============

> Songs and slides for DCC

# goals

- Extremely easy to create/modify songs and projects. No more copy and pasting slides together.
- No more mis-matched styles; just a global `styles.css` file.
- No bloated software (e.g. powerpoint, libre office)
- Better keyboard shortcuts:
	- Previous slide: <kbd>Page Up</kbd>, <kbd>Left</kbd>, <kbd>Up</kbd>, <kbd>J</kbd>, <kbd>O</kbd>, <kbd>Backspace</kbd>
	- Next Slide: <kbd>Page Down</kbd>, <kbd>Right</kbd>, <kbd>Down</kbd>, <kbd>K</kbd>, <kbd>P</kbd>, <kbd>Space</kbd>
	- First Slide: <kbd>Home</kbd>
	- Last Slide: <kbd>End</kbd>

# project spec

A project is a list of songs, pictures, and blank slides.

- a picture (e.g. `welcome.png`)
- a song file (e.g. `amazing-grace.txt`)
- a blank slide (blank line).

A project is stored in a text file like:

```
welcome.png

intro-2015-05-23.txt

amazing-grace.txt
another-song.txt

last-song.txt
```



# slide spec

## picture

A slide can be a picture file. The picture centered horizontally and vertically, and is not stretched.

## song

A song is a text file. It holds headers, footers, lyrics, and slide breaks.

- Slide Breaks
	- [x] A slide break is a line with three or more hyphens (`-`).
	- [x] A slide break at the beginning of a song file (without content before it) will be ignored. It will *not* be interpreted as an empty slide.
	- [x] A slide break at the end of a song file (without content after it) will be ignored. It will *not* be interpreted as an empty slide.
	- [ ] Consecutive slide breaks *are* interpreted as empty slides.
	- [x] Newlines surrounding slide breaks are ignored.
	- [x] Can be matched with this regex: `/^-{3,}$/gm`
- Headers
	- [x] A header must not be defined below lyrics in the same slide. (Usually defined at the top of a file, or just below a slide break.)
	- [x] A header must begin with a pound sign followed by a space (`# Title of Song`).
	- [x] A slide in which a header is defined will use that header.
	- [x] Subsequent slides within that song file will inherit the header, unless a later header overrides it.
	- [x] Can be matched with this regex: `/^# .+/gm`
- Footers
	- [x] A footer must not be defined above lyrics in the same slide. (Usually defined at the bottom of a file, or just above a slide break.)
	- [x] A footer must begin with a greater-than sign followed by a space (`> License or whatever`).
	- [x] A slide in which a footer is defined will use that footer.
	- [x] Subsequent slides will not inherit the footer.
	- [x] Can be matched with this regex: `/^> .+/gm`
- Lyrics
	- [x] Lyrics are anything that is not a header, footer, or a slide break.
	- [x] Surrounding newlines are ignored.

```md
# Amazing Grace

Amazing Grace, how sweet the sound,
that saved a wretch like me!
I once was lost but now am found,
was blind, but now, I see.
--------------------------------------------
T'was Grace that taught my heart to fear,
and Grace, my fears relieved.
How precious did that Grace appear,
the hour I first believed.
--------------------------------------------
Through many dangers, toils and snares,
we have already come.
T'was Grace that brought us safe thus far,
and Grace will lead us home.
--------------------------------------------
The Lord has promised good to me,
His word my hope secures.
He will my shield and portion be,
as long as life endures.
--------------------------------------------
When we've been here ten thousand years,
bright shining as the sun.
We've no less days to sing God's praise,
then when we've first begun.
--------------------------------------------
Amazing Grace, how sweet the sound,
that saved a wretch like me!
I once was lost but now am found,
was blind, but now, I see.

> Public Domain

```

# license

[VOL](http://veryopenlicense.com)
