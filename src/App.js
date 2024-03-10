import React, { useState } from 'react';
import axios from 'axios';
import { apiKey } from './constants';

function App() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`);
      setWeatherData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="App">
      <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
        <div className="px-8 py-6 mt-4 text-left bg-whites shadow-lg">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Weather App</h1>
          </div>
          <form onSubmit={handleSearch}>
            <div className="mt-4">
              <input type="text" value={location} onChange={(event) => setLocation(event.target.value)} className="w-full px-4 py-2 border rounded-md" placeholder="Enter location" />
            </div>
          </form>
          {weatherData && (
            <div className="mt-8">
              <h2 className="text-xl font-bold">Weather Information</h2>
              <div className="mt-2">
                <p>Temperature: {weatherData.main.temp} K</p>
                <p>Weather: {weatherData.weather[0].description}</p>
                <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                <p>Humidity: {weatherData.main.humidity}%</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
