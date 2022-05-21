const express = require('express')
const router = express.Router()

const Day = require('../models/Day')
const Movie = require('../models/Movie')

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

// UPDATE AVAILABILITY ON CHOSEN SEATS BY DAY-ID AND TIME
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
			time: timeSlot.time,
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
