const mongoose = require('mongoose')
const daysSchema = new mongoose.Schema({
	date: String,
	weekday: String,
	movieId: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'Movie'
	},
	timeSlots: [
		{
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

module.exports = mongoose.model('days', daysSchema)
