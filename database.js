const fs = require('fs');
let data = []

const readData = () => {
	data = fs.existsSync('./data.json') ? JSON.parse(fs.readFileSync('./data.json')) : []	
}

const getWeather = () => {
	readData()
	return data
}

const updateWeather = (update) => {
	readData()
	const index = data.findIndex(el => el.location === update.location)
	if (index === -1) {
		data.push(update)
	} else {
		data[index] = update
	}
	fs.writeFileSync('./data.json', JSON.stringify(data, null, 4))
}

const deleteWeather = (location) => {
	readData()
	const index = data.findIndex(el => el.location === location)
	if (index === -1 ) {
		return false; 
	} else {
		data.splice(index, 1) 
		fs.writeFileSync('./data.json', JSON.stringify(data, null, 4))
		return true
	}
}

readData()

module.exports = {getWeather, updateWeather, deleteWeather}