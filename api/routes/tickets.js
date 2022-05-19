const express = require('express')
const router = express.Router()

const Ticket = require('../models/Ticket')

// POST
router.post('/', async (req, res) => {
	const ticket = new Ticket({
		movie: req.body.movieId,
		date: req.body.date,
		time: req.body.time,
		seat: req.body.seatId
	})
	try {
		const savedTicket = await ticket.save()
		res.json(savedTicket)
	} catch (error) {
		res.json({message: error})
	}
})

module.exports = router
