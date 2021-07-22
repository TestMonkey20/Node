const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000
const {getWeather, updateWeather, deleteWeather} = require('./database.js')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
	res.json(getWeather())
})

app.post('/', (req, res) => {
	if (Object.keys(req.body).length === 4 &&
		'location' in req.body &&
		'temperature' in req.body &&
		'humidity' in req.body &&
		'pressure' in req.body)
	{
		updateWeather(req.body) 
		res.status(200)
		console.log(req.body)
	} else {
		res.status(400)
	}

	res.end()
  })

app.delete('/', (req, res) => {
	if ('location' in req.body &&
		deleteWeather(req.body.location) === true) 
	{
		res.status(200)
	} else {
		res.status(418)
	}

	res.end()
})

app.listen(port, () => {
	console.log(`http://localhost:${port}`)
})