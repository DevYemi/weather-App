import React from 'react';
import './App.css';
import { useState } from 'react'
const api = {
  key: '3e7479e8e7e19cb489fc5464231954e9',
  base: 'http://api.openweathermap.org/data/2.5/'
}

function App() {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({});
  var cW = null
  var message = 'Input your Location'
  const search = evt => {
    if (evt.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&appid=${api.key}`)
        .then(res => res.json())
        .then(result => {
            console.log(result);
            setWeather(result);
            console.log(weather.main)
            setQuery('')
        })

    }
  }

  let dateBuilder = (d) => {
    let months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday']
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`
  }
  function celsiusWeather(weather) {
    let result = weather - 273.15;
    if (result > 29 && result < 38) {
      let bg = document.getElementsByClassName('app')[0]
      bg.classList.remove('warm')
      bg.classList.add('hot')
    }
    else {
      let bg = document.getElementsByClassName('app')[0]
      bg.classList.remove('hot')
      bg.classList.add('warm')
    }
    cW = + (Math.round(result + 'e+2') + 'e-2')
  }
  return (
    <div className="app">
      <main>
        <div className='search-box'>
          <input
            type="text"
            className='search-bar'
            placeholder='search...'
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != 'undefined') ?
          <>
            {celsiusWeather(weather.main.temp)}
            <div className="location-box">
              <div className='location'>{`${weather.name}, ${weather.sys.country}`}</div>
              <div className='date'>{dateBuilder(new Date())}</div>
            </div>
            <div className='weather-box'>
              <div className='deg'>{cW}°C</div>
              <div className='temp'>{weather.weather[0].main}</div>
  </div></> : <div className="location">{message}</div>}

      </main>
    </div>
  );
}

export default App;
