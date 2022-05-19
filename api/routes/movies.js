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

// GET BY ID
router.get('/:movieId', async (req, res) => {
	try {
		const movie = await Movie.findById(req.params.movieId)
		res.json(movie)
	} catch (error) {
		res.json({message: error})
	}
})

// UPDATE
router.patch('/:movieId', async (req, res) => {
	try {
		const updatedMovie = await Movie.updateOne(
			{_id: req.params.movieId},
			{
				$push: {
					seats: {
						row: req.body.row,
						chair: req.body.chair,
						available: req.body.available
					}
				}
			}
		)
		res.json(updatedMovie)
	} catch (error) {
		res.json({message: error})
	}
})

module.exports = router
