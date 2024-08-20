import React, { useState } from 'react';
import Pokedex from 'pokedex-promise-v2';
import { FastAverageColor } from 'fast-average-color';
import SearchBar from './components/SearchBar';
import PokemonInfo from './components/PokemonInfo';
import Footer from './components/Footer';

const P = new Pokedex();
const fac = new FastAverageColor();

const App = () => {
  const [pokemonData, setPokemonData] = useState(null);
  const [spriteColor, setSpriteColor] = useState(null);

  const searchPokemon = async (pokemonName) => {
    try {
      const response = await P.getPokemonByName(pokemonName.toLowerCase());
      setPokemonData(response);

      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = response.sprites.front_default;
      img.onload = () => {
        const color = fac.getColor(img);
        setSpriteColor(color);
      };
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
      setPokemonData(null);
      setSpriteColor(null);
    }
  };

  return (
    <div className="App">
      <SearchBar onSearch={searchPokemon} />
      {pokemonData && <PokemonInfo pokemon={pokemonData} spriteColor={spriteColor} />}
      <Footer />
    </div>
  );
};

export default App;