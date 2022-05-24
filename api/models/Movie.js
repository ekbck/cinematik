const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
	title: String,
	image: String,
	director: String,
	leads: String,
	year: String,
	summary: String
})

module.exports = mongoose.model('Movie', movieSchema)
