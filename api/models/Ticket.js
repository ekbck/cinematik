const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
	date: String,
	time: String,
	movieTitle: String,
	movieImageUrl: String,
	seat: {
		row: String,
		chair: String
	}
})

module.exports = mongoose.model('Ticket', ticketSchema)
