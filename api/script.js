const Ticket = require('./models/Ticket')
const Day = require('./models/Day')
const Movie = require('./models/Movie')
const Seat = require('./models/Seat')
const mongoose = require('mongoose')

const seats = require('./seats')

mongoose.connect('mongodb://localhost/cinematik', () =>
	console.log('Scirpt connected to DB!')
)

run()
async function run() {
	const movieId = '626fc7fed02e2d54b8ab7834'
	const date = '07.06.2022'
	const time = '20:00'
	const dayId = '6282a796e6adf17d0cedca76'

	try {
		const day = await Day.findById(dayId)
		console.log(day)
		console.log('---------')
		const timeSlot = day.timeSlots.find((slot) => slot.time === time)
		const seats = timeSlot.seats
		console.log(seats)
	} catch (error) {
		console.log(error.message)
	}
}
