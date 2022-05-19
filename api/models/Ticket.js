const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
	movie: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'Movie',
		required: true
	},
	date: {
		type: String,
		required: true
	},
	time: String,
	seat: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'Seat'
	}
})

module.exports = mongoose.model('Ticket', ticketSchema)
