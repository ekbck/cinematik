const express = require('express')
const router = express.Router()

const Day = require('../models/Day')
const Movie = require('../models/Movie')

// GET ALL
router.get('/', async (req, res) => {
	try {
		const days = await Day.find()
		res.json(days)
	} catch (error) {
		res.json({message: error})
	}
})

// GET BY ID
router.get('/:dayId', async (req, res) => {
	try {
		const day = await Day.findById(req.params.dayId)
		res.json(day)
	} catch (error) {
		res.json({message: error})
	}
})

// GET DATES BY MOVIE-ID
router.get('/movie/:movieId', async (req, res) => {
	try {
		const days = await Day.find({movieId: req.params.movieId})
		res.json(days)
	} catch (error) {
		res.json({message: error.message})
	}
})

// GET SEATS BY DAY-ID AND TIME
router.get('/:dayId/:time', async (req, res) => {
	try {
		const day = await Day.findById(req.params.dayId)
		const timeSlot = day.timeSlots.find(
			(slot) => slot?.time === req.params.time
		)
		res.json(timeSlot.seats)
	} catch (error) {
		res.json({message: error.message})
	}
})

// UPDATE 1 SEATS AVAILABILITY
router.patch('/seat/:dayId/:seatId', async (req, res) => {
	try {
		const day = await Day.findById(req.params.dayId)
		const timeSlot = day.timeSlots.find(
			(slot) => slot.time === req.body.time
		)
		const seat = timeSlot.seats?.find(
			(seat) => seat._id.toString() === req.params.seatId
		)
		seat.available = false
		day.save()
		res.json(seat)
	} catch (error) {
		res.json({message: error.message})
	}
})

// UPDATE SEVERAL SEATS
router.patch('/seat/:dayId/', async (req, res) => {
	try {
		const day = await Day.findById(req.params.dayId)
		const movie = await Movie.findById(day.movieId)

		const timeSlot = day.timeSlots.find(
			(slot) => slot.time === req.body.time
		)

		const matchedSeats = []
		req.body.seats.forEach((seatFromReq) =>
			matchedSeats.push(
				timeSlot.seats.find(
					(seatFromDb) => seatFromDb._id.toString() === seatFromReq
				)
			)
		)
		matchedSeats.forEach((seat) => (seat.available = false))
		day.save()

		const booking = {
			date: day.date,
			time: day.time,
			movieTitle: movie.title,
			movieImageUrl: movie.image,
			seats: matchedSeats
		}

		res.json(booking)
	} catch (error) {
		res.json({message: error.message})
	}
})

module.exports = router
