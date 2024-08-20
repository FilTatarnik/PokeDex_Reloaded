import React, { useState } from 'react';
import Pokedex from 'pokedex-promise-v2';
import SearchBar from './components/SearchBar';
import PokemonInfo from './components/PokemonInfo';
import Footer from './components/Footer';

const P = new Pokedex();

const App = () => {
  const [pokemonData, setPokemonData] = useState(null);
  const [spriteColors, setSpriteColors] = useState(null);

  const searchPokemon = async (pokemonName) => {
    try {
      const response = await P.getPokemonByName(pokemonName.toLowerCase());
      setPokemonData(response);

      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = response.sprites.front_default;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const colors = quantizeColors(imageData.data, 9);
        setSpriteColors(colors);
      };
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
      setPokemonData(null);
      setSpriteColors(null);
    }
  };

  const quantizeColors = (pixels, colorCount) => {
    const pixelArray = [];
    for (let i = 0; i < pixels.length; i += 4) {
      if (pixels[i + 3] > 0) {  // Only consider non-transparent pixels
        pixelArray.push([pixels[i], pixels[i + 1], pixels[i + 2]]);
      }
    }

    const colorMap = {};
    pixelArray.forEach(color => {
      const key = color.join(',');
      colorMap[key] = (colorMap[key] || 0) + 1;
    });

    const sortedColors = Object.entries(colorMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, colorCount)
      .map(([color]) => color.split(',').map(Number));

    return sortedColors.map(rgb => `#${rgb.map(x => x.toString(16).padStart(2, '0')).join('')}`);
  };

  return (
    <div className="App">
      <SearchBar onSearch={searchPokemon} />
      {pokemonData && <PokemonInfo pokemon={pokemonData} spriteColors={spriteColors} />}
      <Footer />
    </div>
  );
};

export default App;