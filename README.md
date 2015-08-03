slideshow
=========

[![Dependency Status](https://david-dm.org/ArtskydJ/slideshow.svg)](https://david-dm.org/ArtskydJ/slideshow)
[![devDependency Status](https://david-dm.org/ArtskydJ/slideshow/dev-status.svg)](https://david-dm.org/ArtskydJ/slideshow#info=devDependencies)

This needs a better name. If you have an idea, [post it here](https://github.com/ArtskydJ/slideshow/issues/1).

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
	- A slide break is a line with three or more hyphens (`-`).
	- A slide break at the beginning of a song file (without content before it) will be ignored. It will *not* be interpreted as an empty slide.
	- A slide break at the end of a song file (without content after it) will be ignored. It will *not* be interpreted as an empty slide.
	- Consecutive slide breaks *are* interpreted as empty slides.
	- Newlines surrounding slide breaks are ignored.
	- Can be matched with this regex: `/^-{3,}$/gm`
- Headers
	- A header must not be defined below lyrics in the same slide. (Usually defined at the top of a file, or just below a slide break.)
	- A header must begin with a pound sign followed by a space (`# Title of Song`).
	- A slide in which a header is defined will use that header.
	- Subsequent slides within that song file will inherit the header, unless a later header overrides it.
	- Can be matched with this regex: `/^# .+/gm`
- Footers
	- A footer must not be defined above lyrics in the same slide. (Usually defined at the bottom of a file, or just above a slide break.)
	- A footer must begin with a greater-than sign followed by a space (`> License or whatever`).
	- A slide in which a footer is defined will use that footer.
	- Subsequent slides will not inherit the footer.
	- Can be matched with this regex: `/^> .+/gm`
- Lyrics are anything that is not a header, footer, or a slide break. Surrounding newlines are ignored, but internal whitespace is preserved.

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
