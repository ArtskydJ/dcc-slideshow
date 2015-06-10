var controls = require('./controls/index.js')
var view = require('./view/index.js')
var parseSong = require('./parse-song/index.js')

controls(document.body)
view(document.getElementById('test-log'))
