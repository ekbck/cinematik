const express = require('express')
const router = express.Router()

const Ticket = require('../models/Ticket')

// POST
router.post('/', async (req, res) => {
	const tickets = []
	req.body.seats?.forEach((seat) =>
		tickets.push(
			new Ticket({
				date: req.body.date,
				time: req.body.time,
				movieTitle: req.body.movieTitle,
				movieImageUrl: req.body.movieImageUrl,
				seat: {
					row: seat.row,
					chair: seat.chair
				}
			})
		)
	)
	try {
		tickets.forEach((ticket) => ticket.save())
		res.json(tickets)
	} catch (error) {
		res.json({message: error})
	}
})

module.exports = router
