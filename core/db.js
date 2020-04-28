const mongoose = require('mongoose')
const uri = 'mongodb://localhost:27017/dental'

mongoose
	.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.catch((err) => console.log(err.reason))

module.exports = mongoose
