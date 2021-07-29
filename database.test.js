const fs = require('fs')
const { getWeather, updateWeather, deleteWeather } = require('./database.js')

let oldData = null

const PATH = './data.json'
const writeData = (data) => fs.writeFileSync(PATH, JSON.stringify(data, null, 4))

describe('database weather get, update, delete', () => {

	const moscowWeather = {
		location: 'Moscow',
		temperature: -23,
		humidity: 18,
		pressure: 1056,
	}

	const diferentNoscowWeather = {
		location: 'Moscow',
		temperature: -21,
		humidity: 20,
		pressure: 1019,
	}
	
	const newYorkWeather = {
		location: 'New York',
		temperature: 22,
		humidity: 18,
		pressure: 1056,
	}

	beforeAll(() => {
		if (fs.existsSync(PATH)) oldData = fs.readFileSync(PATH)
	})

	afterAll(() => {
		if (oldData) fs.writeFileSync(PATH, oldData.toString())
		else if (fs.existsSync(PATH)) fs.unlinkSync(PATH)
	})

	it('should return [] if data.js does not exist', () => {
		if (fs.existsSync(PATH)) fs.unlinkSync(PATH)
		expect(getWeather()).toEqual([])
	})
	
	it('should return [] if data.json is empty', () => {
		writeData([])
		expect(getWeather()).toEqual([])
	})
	
	it('should return data that has been written to data.json', () => {
		writeData([moscowWeather])
		expect(getWeather()).toEqual([moscowWeather])
	})

	it('should return data that has been changed in data.json', () => {
		writeData([diferentNoscowWeather])
		expect(getWeather()).toEqual([diferentNoscowWeather])
	})
	
	it('should add data after update weather', () => {
		updateWeather(newYorkWeather)
		expect(getWeather()).toEqual([diferentNoscowWeather, newYorkWeather])
	})

	it('should delete data after delete weather', () => {
		deleteWeather(newYorkWeather.location)
		expect(getWeather()).toEqual([diferentNoscowWeather])
	})

})
