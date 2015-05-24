slideshow
=========

This needs a better name. If you have an idea, [post it here](https://github.com/ArtskydJ/slideshow/issues/1).

# goals

- Extremely easy to create/modify songs and programs.
- No messing with styles except with a `styles.css` file.

# program spec

A program is a list of songs, pictures, and blank slides.

- a picture (e.g. `welcome.png`)
- a song file (e.g. `amazing-grace.txt`)
- a blank slide (blank line).

A program is stored in a text file like:

```
welcome.png

intro-2015-05-23.txt

amazing-grace.txt
another-song.txt

last-song.txt
```



# slide spec

## picture

A slide can be a picture file. The picture is stretched to fit. It is a 1:1 stretch, so the picture is not skewed.

## song

A song is a text file. It holds headers, footers, lyrics, and slide breaks.

- Slide Breaks
	- A slide break is a line with three or more hyphens (`-`).
	- A slide break at the beginning of a song file without content before it will be ignored. It will *not* be interpreted as an empty slide.
	- A slide break at the end of a song file without content after it will be ignored. It will *not* be interpreted as an empty slide.
	- Consecutive slide breaks *are* interpreted as empty slides.
	- Newlines surrounding slide breaks are ignored.
- Headers
	- A header must be delimited by tildes (`~`).
	- A slide in which a header is defined will use that header.
	- Subsequent slides within that song file will inherit the header, unless a later header overrides it.
- Footers
	- A footer must be delimited by square brackets (`[`, `]`).
	- A slide in which a footer is defined will use that footer.
	- Subsequent slides will not inherit the footer.
- Lyrics are anything that is not a header, footer, or a slide break. Surrounding newlines are ignored, but internal whitespace is preserved.

```
~Amazing Grace~

Amazing Grace, how sweet the sound,
That saved a wretch like me....
I once was lost but now am found,
Was blind, but now, I see.
--------------------------------------------
T'was Grace that taught...
my heart to fear.
And Grace, my fears relieved.
How precious did that Grace appear...
the hour I first believed.
--------------------------------------------
Through many dangers, toils and snares...
we have already come.
T'was Grace that brought us safe thus far...
and Grace will lead us home.
--------------------------------------------
The Lord has promised good to me...
His word my hope secures.
He will my shield and portion be...
as long as life endures.
--------------------------------------------
When we've been here ten thousand years...
bright shining as the sun.
We've no less days to sing God's praise...
then when we've first begun.
--------------------------------------------
Amazing Grace, how sweet the sound,
That saved a wretch like me....
I once was lost but now am found,
Was blind, but now, I see.

[Public Domain maybe]
```

# license

[VOL](http://veryopenlicense.com)
