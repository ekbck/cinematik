const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true
	},
	director: {
		type: String,
		required: true
	},
	leads: {
		type: String,
		required: true
	},
	year: {
		type: String,
		required: true
	},
	summary: {
		type: String,
		required: true
	},
	length: {
		type: String,
		required: true
	},
	timeSlots: [
		{
			date: String,
			time: String,
			seats: [
				{
					row: String,
					chair: String,
					available: {
						type: Boolean,
						default: true
					}
				}
			]
		}
	]
})

module.exports = mongoose.model('Movie', movieSchema)
