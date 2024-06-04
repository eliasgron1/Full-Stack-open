import axios from 'axios'

const URL = 'https://studies.cs.helsinki.fi/restcountries/api'
const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather?mode=json&units=metric&"
const API_KEY = import.meta.env.VITE_APIKEY


const getAll = () => {
    const request = axios.get(`${URL}/all`)
    return request.then(response => response.data)
}

const getByName = (name) => {
    const request = axios.get(`${URL}/name/${name}`) 
    return request.then(response => response.data)
}

const getCapitalWeather = (lat, lng) => {
    console.log(API_KEY)
    const request = axios.get(`${WEATHER_URL}lat=${lat}&lon=${lng}&appid=${API_KEY}`)
    return request.then(response => response.data)
}

export default { 
    getAll: getAll,  
    getByName: getByName,
    getCapitalWeather: getCapitalWeather
  }