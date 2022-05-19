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
		const weekdays = []
		days.forEach((day) => weekdays.push(day.weekday))
		res.json(weekdays)
	} catch (error) {
		res.json({message: error})
	}
})

// GET

module.exports = router
