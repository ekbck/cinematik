const express = require('express')
const router = express.Router()

const Movie = require('../models/Movie')

// GET ALL
router.get('/', async (req, res) => {
	try {
		const movies = await Movie.find()
		res.json(movies)
	} catch (error) {
		res.json({message: error})
	}
})

module.exports = router
