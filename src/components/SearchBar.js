import React, { useState } from 'react';
import './PokemonInfo.css';


const SearchBar = ({ onSearch, theme }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="search-bar-container" style={{ backgroundColor: theme.secondary }}>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter Pokemon name"
          className="search-input"
          style={{ backgroundColor: theme.textLight, color: theme.textDark }}
        />
        <button type="submit" className="search-button" style={{ backgroundColor: theme.accent, color: theme.textLight }}>
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;