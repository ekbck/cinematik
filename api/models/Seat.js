const mongoose = require('mongoose')

const seatSchema = new mongoose.Schema({
	row: {
		type: String,
		required: true
	},
	chair: {
		type: String,
		required: true
	},
	available: {
		type: Boolean,
		default: true
	}
})

module.exports = mongoose.model('Seat', seatSchema)
