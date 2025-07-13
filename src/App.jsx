import React, { useCallback,useState, useEffect } from 'react';
import debounce from 'lodash.debounce';
import WeatherSearch from './components/WeatherSearch';
const WeatherApp = () => {
   const getWeatherIcon = (condition) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return '🌧️';
    } else if (conditionLower.includes('snow')) {
      return '❄️';
    } else if (conditionLower.includes('cloud')) {
      return '☁️';
    } else if (conditionLower.includes('sun') || conditionLower.includes('clear')) {
      return '☀️';
    } else {
      return '🌤️';
    }
  };
    const getBackgroundGradient = () => {
    if (!weatherData) return 'from-blue-400 to-purple-600';
    
    const condition = weatherData.current.condition.text.toLowerCase();
    const isDay = weatherData.current.is_day === 1;
    
    if (condition.includes('rain')) {
      return isDay ? 'from-gray-500 to-gray-700' : 'from-gray-700 to-gray-900';
    } else if (condition.includes('snow')) {
      return isDay ? 'from-blue-100 to-blue-300' : 'from-blue-700 to-blue-900';
    } else if (condition.includes('cloud')) {
      return isDay ? 'from-gray-400 to-gray-600' : 'from-gray-600 to-gray-800';
    } else {
      return isDay ? 'from-blue-400 to-purple-600' : 'from-purple-700 to-indigo-900';
    }
  };
  const [weatherData, setWeatherData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState('C');
  const [city, setCity] = useState('London')

  const APIKEY = import.meta.env.VITE_APP_KEY;
  const [Suggestions,setSuggestions] = useState([])

    const fetchWeatherData = useCallback(debounce(async (city) => {
      setLoading(true);
      setError('');
      try {
        const q = encodeURIComponent(city);
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=${q}&aqi=yes`);
        if (!response.ok) {
          throw new Error(`Network error(Status:${response.status})`);
        }
        const json = await response.json();
        setWeatherData(json);
        console.log(json)
      } catch (err) {
        console.warn("API fetching failed. Fallback to DummyData, Reason ", err.message);
        setError('Failed to fetch weather data, Showing dummydata');
        try {
          const dummyResponse = await fetch('./dummy.json');
          if (!dummyResponse.ok) {
            throw new Error(`Dummy data not found or unreadable (Status: ${dummyResponse.status})`);
          }
          const dummyJson = await dummyResponse.json();
          setWeatherData(Array.isArray(dummyJson.data) ? dummyJson.data : dummyJson);
        } catch (dummyError) {
          console.error("Failed to load both API and dummy data: ", dummyError.message);
          setError("Failed to load any match data. Please check your connection.");
        }
      }
      setLoading(false);
    },400),[]
    , []);

      useEffect(() => {
        if(city){
          fetchWeatherData(city);
        }
    
    return fetchWeatherData.cancel;
  }, [city, fetchWeatherData]);

 
  return (
    <div className={`fixed inset-0 bg-gradient-to-br ${getBackgroundGradient()} p-5 overflow-auto transition-colors duration-1000`}>
      <div className="max-w-7xl mx-auto text-white">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">🌤️ WeatherPro</h1>
          <p className="text-white/80 text-lg">Advanced Weather Information</p>
        </div>

        <div className="max-w-lg mx-auto mb-10 relative">
          <WeatherSearch onSelect={setCity} />

        </div>

        {loading && (
          <div className="text-center py-10">
            <div className="inline-block w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            <p className="mt-5 text-lg">Loading weather data...</p>
          </div>
        )}

        {error && (
          <div className="text-center text-red-300 bg-red-500/10 p-5 rounded-2xl mb-8 max-w-md mx-auto">
            <p>{error}</p>
          </div>
        )}

        {weatherData && !loading && (
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <div className="bg-white/10 backdrop-blur-md p-10 rounded-3xl border border-white/20">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
                  <div>
                    <h2 className="text-3xl font-bold mb-1">📍 {weatherData.location.name}</h2>
                    <p className="text-white/80 text-lg">{weatherData.location.region}, {weatherData.location.country}</p>
                    <p className="text-white/60 text-sm mt-1">{weatherData.location.localtime}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setUnit('C')}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        unit === 'C' ? 'bg-white/30 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
                      }`}
                    >
                      °C
                    </button>
                    <button
                      onClick={() => setUnit('F')}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        unit === 'F' ? 'bg-white/30 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
                      }`}
                    >
                      °F
                    </button>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
                  <div className="text-6xl">
                    {getWeatherIcon(weatherData.current.condition.text)}
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-6xl font-bold mb-2">
                      {Math.round(unit === 'C' ? weatherData.current.temp_c : weatherData.current.temp_f)}°
                    </h3>
                    <p className="text-xl text-white/90">{weatherData.current.condition.text}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl text-center">
                    <div className="text-2xl mb-2">🌡️</div>
                    <div className="text-white/70 text-sm mb-1">Feels Like</div>
                    <div className="text-white font-bold text-lg">
                      {Math.round(unit === 'C' ? weatherData.current.feelslike_c : weatherData.current.feelslike_f)}°
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl text-center">
                    <div className="text-2xl mb-2">💨</div>
                    <div className="text-white/70 text-sm mb-1">Wind</div>
                    <div className="text-white font-bold text-lg">{Math.round(weatherData.current.wind_kph)} km/h</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl text-center">
                    <div className="text-2xl mb-2">💧</div>
                    <div className="text-white/70 text-sm mb-1">Humidity</div>
                    <div className="text-white font-bold text-lg">{weatherData.current.humidity}%</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl text-center">
                    <div className="text-2xl mb-2">👁️</div>
                    <div className="text-white/70 text-sm mb-1">Visibility</div>
                    <div className="text-white font-bold text-lg">{weatherData.current.vis_km} km</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
                <h3 className="text-xl font-bold mb-5">🌤️ Weather Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/70">Pressure</span>
                    <span className="text-white font-medium">{weatherData.current.pressure_mb} mb</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/70">UV Index</span>
                    <span className="text-white font-medium">{weatherData.current.uv}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/70">Cloud Cover</span>
                    <span className="text-white font-medium">{weatherData.current.cloud}%</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/70">Dew Point</span>
                    <span className="text-white font-medium">
                      {Math.round(unit === 'C' ? weatherData.current.dewpoint_c : weatherData.current.dewpoint_f)}°
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/70">Wind Direction</span>
                    <span className="text-white font-medium">{weatherData.current.wind_dir}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-white/70">Wind Gust</span>
                    <span className="text-white font-medium">{weatherData.current.gust_kph} km/h</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
                <h3 className="text-xl font-bold mb-5">📍 Location Info</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/70">Latitude</span>
                    <span className="text-white font-medium">{weatherData.location.lat}°</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/70">Longitude</span>
                    <span className="text-white font-medium">{weatherData.location.lon}°</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/70">Timezone</span>
                    <span className="text-white font-medium text-sm">{weatherData.location.tz_id}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-white/70">Last Updated</span>
                    <span className="text-white font-medium text-sm">{weatherData.current.last_updated}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;