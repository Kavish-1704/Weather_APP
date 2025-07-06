import React from 'react';

const WeatherCard = ({ data }) => {
  return (
    <div className="weather-card">
      <h2>{data.city}</h2>
      <p>Temperature: {data.temperature}°C</p>
      <p>Condition: {data.condition}</p>
    </div>
  );
};

export default WeatherCard;