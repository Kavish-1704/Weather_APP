# 🌤️ WeatherPro - Advanced Weather Information App

A modern, responsive weather application built with React and Vite, featuring real-time weather data, location search, and a beautiful gradient UI that adapts to weather conditions.

## ✨ Features

- **Real-time Weather Data**: Get current weather information for any location worldwide
- **Smart Location Search**: Auto-complete search with location suggestions
- **Dynamic UI**: Background gradients that change based on weather conditions and time of day
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Multiple Units**: Switch between Celsius and Fahrenheit
- **Comprehensive Weather Details**: Temperature, humidity, wind speed, visibility, pressure, UV index, and more
- **Error Handling**: Graceful fallback to dummy data when API is unavailable
- **Rate Limiting Protection**: Built-in handling for API rate limits

## 🚀 Demo

[Live Demo](weather-app-pe7r.vercel.app)
## 📸 Screenshots

![Homepage](weather_ap/public/HP1.png)
![Homepage](weather_ap/public/HP2.png)

## 🛠️ Technologies Used

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **WeatherAPI** - Weather data provider
- **Lodash** - Utility library for debouncing

## 🏗️ Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- WeatherAPI key (free from [WeatherAPI.com](https://www.weatherapi.com/))

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kavish-1704/Weather_APP.git
   cd Weather_APP
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the project root:
   ```bash
   VITE_API_KEY=your_weatherapi_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

## 🔧 Configuration

### Getting a WeatherAPI Key

1. Visit [WeatherAPI.com](https://www.weatherapi.com/)
2. Sign up for a free account
3. Go to your dashboard and copy your API key
4. Add it to your `.env` file

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_WEATHER_KEY` | WeatherAPI key for location search | Yes |
| `VITE_API_KEY` | WeatherAPI key for weather data | Yes |

## 🏗️ Build for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## 📁 Project Structure

```
Weather_APP/
├── public/
│   └── dummy.json          # Fallback weather data
├── src/
│   ├── components/
│   │   └── WeatherSearch.jsx
│   ├── App.jsx            # Main weather app component
│   ├── main.jsx           # App entry point
│   └── index.css          # Global styles
├── .env                   # Environment variables
├── package.json
└── README.md
```

## 🎨 Features Breakdown

### Weather Search Component
- **Auto-complete search** with debounced API calls
- **Keyboard navigation** (arrow keys, enter)
- **Click-outside to close** functionality
- **Rate limiting protection** with retry mechanism

### Main Weather Display
- **Dynamic backgrounds** based on weather conditions
- **Temperature unit switching** (°C/°F)
- **Comprehensive weather metrics**:
  - Current temperature and "feels like"
  - Wind speed and direction
  - Humidity and visibility
  - Pressure and UV index
  - Cloud cover and dew point

### Responsive Design
- **Mobile-first approach**
- **Adaptive layouts** for different screen sizes
- **Touch-friendly** interface elements

## 🔄 API Integration

The app uses [WeatherAPI](https://www.weatherapi.com/) for:
- Location search and autocomplete
- Current weather data
- Air quality information

### API Endpoints Used
- `GET /v1/search.json` - Location search
- `GET /v1/current.json` - Current weather data

## 🚨 Error Handling

The app includes robust error handling:
- **Network errors**: Displays user-friendly error messages
- **API failures**: Falls back to dummy data
- **Rate limiting**: Shows retry countdown
- **Invalid locations**: Provides helpful feedback

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- Weather data provided by [WeatherAPI](https://www.weatherapi.com/)
- Icons and emojis for weather representation
- Tailwind CSS for styling utilities

## 📧 Contact

**Kavish** - [@Kavish-1704](https://github.com/Kavish-1704)

Project Link: [https://github.com/Kavish-1704/Weather_APP](https://github.com/Kavish-1704/Weather_APP)

---

⭐ If you found this project helpful, please give it a star!