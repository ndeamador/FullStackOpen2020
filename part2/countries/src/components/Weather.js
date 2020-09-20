import React, { useState, useEffect } from 'react'
import axios from 'axios';

const Weather = ({ country }) => {

    const [currentWeather, setNewWeather] = useState({})

    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHERSTACK_API_KEY}&query=${country[0].capital}`)
            .then(res => {
                setNewWeather(res.data)
            })
    }, [country])


    console.log(country)
    console.log(country[0])
    console.log(currentWeather.length, currentWeather)

    if (Object.keys(currentWeather).length === 0) {
        return <div>loading weather...</div>
    }
    else if (Object.keys(currentWeather).length > 0) {
        return (
            <>
                <h3>Weather in {currentWeather.location.name}</h3>
                <div><strong>temperature:</strong> {currentWeather.current.temperature} Celsius</div>
                <img src={currentWeather.current.weather_icons[0]} alt={`weather icon: ${currentWeather.current.weather_descriptions[0]}`} />
                <div><strong>wind:</strong> {currentWeather.current.wind_speed} kph direction {currentWeather.current.wind_dir}</div>
            </>
        )
    }
}

export default Weather