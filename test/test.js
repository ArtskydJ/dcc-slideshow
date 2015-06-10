var parseSong = require('../js/parse-song/index.js')
var fs = require('fs')

var songFile = fs.readFileSync(__dirname + '/amazing-grace.md', { encoding: 'utf8' })
parseSong(songFile).forEach(console.log)
