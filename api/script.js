const Ticket = require('./models/Ticket')
const Day = require('./models/Day')
const Movie = require('./models/Movie')
const Seat = require('./models/Seat')
const mongoose = require('mongoose')

const seats = require('./seats')

mongoose.connect('mongodb://localhost/cinematik', () =>
	console.log('Connected to DB!')
)

run()
async function run() {
	const movieId = '626fc7fed02e2d54b8ab7834'

	try {
		const day = await Day.findById('6282a796e6adf17d0cedca76')
		console.log(day)
		//console.log('-----')
		//const the19th = days.find((e) => e.date === '19.05.2022')
		//console.log('The 19th: ' + the19th)
		//the19th.timeSlots[0].seats = seats
		//console.log(the19th.timeSlots[0].seats)

		//console.log(the19th.date)
		//console.log(the19th.timeSlots[0].seats.length)
	} catch (error) {
		console.log(error.message)
	}
}
