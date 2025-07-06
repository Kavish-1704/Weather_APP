import React from 'react';

const SearchBar = ({ city, setCity }) => {
  return (
    <input
      type="text"
      placeholder="Enter city"
      value={city}
      onChange={(e) => setCity(e.target.value)}
      className="search-bar"
    />
  );
};

export default SearchBar;