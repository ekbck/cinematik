const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config({path: '../.env'})

// Middlewares
app.use(cors())
app.use(bodyParser.json())

const moviesRoute = require('./routes/movies')
const ticketsRoute = require('./routes/tickets')
const daysRoute = require('./routes/days')

app.use('/movies', moviesRoute)
app.use('/tickets', ticketsRoute)
app.use('/days', daysRoute)

mongoose.connect(process.env.DB_CONNECTION, () =>
	console.log('App connected to DB!')
)

app.listen(9000)
