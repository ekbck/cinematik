const Ticket = require('./models/Ticket')
const Day = require('./models/Day')
const Movie = require('./models/Movie')
const Seat = require('./models/Seat')
const mongoose = require('mongoose')

const seats = require('./seats')
const {$where} = require('./models/Day')

mongoose.connect('mongodb://localhost/cinematik', () =>
	console.log('Script connected to DB!')
)

run()
async function run() {
	const movieId = '626fc7fed02e2d54b8ab7834'
	const date = '07.06.2022'
	const row = '01'
	const chair = '01'

	const dayId = '6282a796e6adf17d0cedca76'
	const time = '20:00'
	const seatId = '6284e8ab6f799668f1eb72c7'
	try {
		const day = await Day.findById(dayId)
		const timeSlot = day.timeSlots.find((slot) => slot?.time === time)
		const seat = timeSlot.seats.find(
			(seat) => seat?._id.toString() === seatId
		)
		console.log(seat)
	} catch (error) {
		console.log(error.message)
	}
}
