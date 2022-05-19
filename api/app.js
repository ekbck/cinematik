const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config({path: '../.env'})

// Middlewares
app.use(cors())
app.use(bodyParser.json())

const postsRoute = require('./routes/posts')
const moviesRoute = require('./routes/movies')
const seatsRoute = require('./routes/seats')
const ticketsRoute = require('./routes/tickets')
const daysRoute = require('./routes/days')

app.use('/posts', postsRoute)
app.use('/movies', moviesRoute)
app.use('/seats', seatsRoute)
app.use('/tickets', ticketsRoute)
app.use('/days', daysRoute)

app.get('/', (req, res) => {
	res.send('We are on home')
})

mongoose.connect(process.env.DB_CONNECTION, () =>
	console.log('Connected to DB!')
)

app.listen(9000)
