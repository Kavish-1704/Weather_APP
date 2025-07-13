import { useState, useCallback, useEffect, useRef } from 'react';
import debounce from 'lodash.debounce';

const KEY = import.meta.env.VITE_APP_KEY;
const SEARCH = `https://api.weatherapi.com/v1/search.json?key=${KEY}&q=`;

export default function WeatherSearch({ onSelect }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selIndex, setSelIndex] = useState(-1);
  const [msg, setMsg] = useState('');
  const [retryIn, setRetryIn] = useState(0);
  const containerRef = useRef(null);

  const searchLocations = useCallback(
    debounce(async (q) => {
      if (!q) return setSuggestions([]);
      try {
        console.log('Searching for:', q); // Debug log
        console.log('API URL:', SEARCH + encodeURIComponent(q)); // Debug log
        
        const res = await fetch(SEARCH + encodeURIComponent(q));
        
        if (res.status === 429) { 
          setMsg('Rate-limited'); 
          setRetryIn(3); 
          return; 
        }
        
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        
        const list = await res.json();
        console.log('API Response:', list); // Debug log
        
        setSuggestions(list);
        setSelIndex(-1);
        setMsg(list.length ? '' : 'No results');
      } catch (error) {
        console.error('Search error:', error); // Debug log
        setMsg('Network error');
        setSuggestions([]);
      }
    }, 300),
    []
  );

  useEffect(() => {
    if (!retryIn) return;
    const id = setInterval(() => setRetryIn((s) => s - 1), 1000);
    if (retryIn === 1) searchLocations.flush();
    return () => clearInterval(id);
  }, [retryIn, searchLocations]);

  useEffect(() => {
    const h = (e) => !containerRef.current?.contains(e.target) && setSuggestions([]);
    window.addEventListener('click', h);
    return () => window.removeEventListener('click', h);
  }, []);

  const handleSearch = () => {
    if (!searchQuery || !suggestions.length) return;
    const choice = selIndex >= 0 ? suggestions[selIndex] : suggestions[0];
    setSearchQuery(choice.name);
    setSuggestions([]);
    
    // Fixed: Access name directly, not choice.location.name
    console.log('Selected location:', choice.name);
    onSelect?.(choice.name);
  };

  const handleKey = (e) => {
    if (!suggestions.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelIndex((i) => (i + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelIndex((i) => (i - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div ref={containerRef} className="max-w-lg mx-auto mb-10 relative">
      
      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl">🔍</span>
      
      <div className='flex flex-wrap relative'>
        {/* Input */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            searchLocations(e.target.value);
          }}
          placeholder="Search for a city..."
          className="w-full pl-12 pr-24 py-4 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
          onKeyDown={handleKey}
        />

        {/* Search button */}
        <button
          onClick={handleSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-5 py-2 bg-white/20 hover:bg-white/30 rounded-full text-white text-sm font-medium transition-colors"
        >
          Search
        </button>
      </div>
      
      {/* Suggestions dropdown */}
      {suggestions.length > 0 && (
        <ul className="absolute mt-2 w-full z-10 bg-white/90 text-black backdrop-blur-md rounded-xl border border-white/30 max-h-60 overflow-y-auto shadow-lg">
          {suggestions.map((s, i) => (
            <li
              key={s.id}
              onClick={() => {
                setSearchQuery(s.name);
                setSuggestions([]);
                // Fixed: Pass only the name, not the whole object
                onSelect?.(s.name);
              }}
              onMouseEnter={() => setSelIndex(i)}
              className={`px-4 py-2 cursor-pointer transition ${
                selIndex === i ? 'bg-white/30 text-white' : 'hover:bg-white/20'
              }`}
            >
              {s.name}, {s.country}
            </li>
          ))}
        </ul>
      )}

      {/* Status */}
      {msg && (
        <p className={`mt-2 text-sm ${
          msg === 'Network error' ? 'text-red-400'
          : msg === 'Rate-limited' ? 'text-orange-300'
          : 'text-white/60'
        }`}>
          {msg === 'Rate-limited' ? `Retrying in ${retryIn}s…` : msg}
        </p>
      )}
    </div>
  );
}