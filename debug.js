var ParseProject = require('./js/parse-project/index.js')
var fs = require('fs')

var parser = ParseProject('http://localhost/test-content/')
parser('project.txt', function (err, htmlSlides) {
	if (err) {
		console.error(err)
	} else {
		console.log(htmlSlides)
	}
})
