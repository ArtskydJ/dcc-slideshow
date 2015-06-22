var controls = require('./controls/index.js')
var view = require('./view/index.js')

view(document.body, function (max) {
	console.log(max)
	controls(document.body, max)
})
