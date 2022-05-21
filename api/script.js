const Ticket = require('./models/Ticket')
const Day = require('./models/Day')
const Movie = require('./models/Movie')
const Seat = require('./models/Seat')
const mongoose = require('mongoose')

const seats = require('./seats')

mongoose.connect('mongodb://localhost/cinematik', () =>
	console.log('Script connected to DB!')
)

run()
async function run() {
	const movieId = '626fc7fed02e2d54b8ab7834'
	const date = '07.06.2022'
	const row = '01'
	const chair = '01'

	const dayId = '6284bf90c821c508b2fea342'
	const time = '20:00'
	const seatId = '6284e8ab6f799668f1eb72c7'
	try {
		const day = await Day.findById(dayId)
		console.log(day)
	} catch (error) {
		console.log(error.message)
	}
}
