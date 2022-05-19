const express = require('express')
const router = express.Router()

const Day = require('../models/Day')

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

// GET SEATS BY MOVIE-ID, DATE AND TIME
router.get('/movie/:dayId/:time', async (req, res) => {
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

module.exports = router
