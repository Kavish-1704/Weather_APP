import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('Silchar');

  useEffect(() => {
    
    setTimeout(() => {
      // will fetch data
      setWeatherData({
        temperature: '--',
        condition: 'Loading...',
        city: city,
      });
      setLoading(false);
    }, 1000);
  }, [city]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
    setLoading(true);
  };

  return (
    <div className="app">
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={handleCityChange}
      />
      {loading ? (
        <p>Loading weather data...</p>
      ) : (
        <div className="weather-card">
          <h2>{weatherData.city}</h2>
          <p>Temperature: {weatherData.temperature}°C</p>
          <p>Condition: {weatherData.condition}</p>
        </div>
      )}
    </div>
  );
};

export default App;