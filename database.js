const fs = require('fs');

const rawdata = fs.readFileSync('data.json')
const data = JSON.parse(rawdata)



const getWeather = () => {
	return data
}

const updateWeather = (update) => {
	const index = data.findIndex(el => el.location === update.location)
	if (index === -1) {
		data.push(update)
	} else {
		data[index] = update	
	}
	fs.writeFileSync('data.json', JSON.stringify(data, null, 4))
}

const deleteWeather = (location) => {
	const index = data.findIndex(el => el.location === location)
	if (index === -1 ) {
		return false;
	} else {
		data.splice(index, 1) 
		fs.writeFileSync('data.json', JSON.stringify(data, null, 4))
		return true
	}
}

module.exports = {getWeather, updateWeather, deleteWeather}