const express = require('express')
const router = express.Router()

const Seat = require('../models/Seat')

// GET ALL
router.get('/', async (req, res) => {
	try {
		const seats = await Seat.find()
		res.json(seats)
	} catch (error) {
		res.json({message: error})
	}
})

// GET BY ID
router.get('/:seatId', async (req, res) => {
	try {
		const seat = await Seat.findById(req.params.seatId)
		res.json(seat)
	} catch (error) {
		res.json({message: error})
	}
})

// UPDATE
router.patch('/:seatId', async (req, res) => {
	try {
		const updatedSeat = await Seat.updateOne(
			{_id: req.params.seatId},
			{$set: {booked: req.body.booked}}
		)
		res.json(updatedSeat)
	} catch (error) {
		res.json({message: error})
	}
})

// POST
router.post('/', async (req, res) => {
	const seat = new Seat({
		row: req.body.row,
		chair: req.body.chair,
		booked: req.body.booked
	})
	try {
		const savedSeat = await seat.save()
		res.json(savedSeat)
	} catch (error) {
		res.json({message: error})
	}
})

module.exports = router
