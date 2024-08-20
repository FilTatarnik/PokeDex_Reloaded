import React, { useState } from 'react';
import Pokedex from 'pokedex-promise-v2';
import SearchBar from './components/SearchBar';
import PokemonInfo from './components/PokemonInfo';
import Footer from './components/Footer';
import './App.css';

const P = new Pokedex();

const defaultTheme = {
  primary: '#f0f0f0',
  secondary: '#ffffff',
  accent: '#000000',
  textLight: '#ffffff',
  textDark: '#000000'
};

const App = () => {
  const [pokemonData, setPokemonData] = useState(null);
  const [spriteColors, setSpriteColors] = useState([]);
  const [themeColors, setThemeColors] = useState(defaultTheme);

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

        // Select theme colors
        const theme = {
          primary: colors[0] || defaultTheme.primary,
          secondary: colors[1] || defaultTheme.secondary,
          accent: colors[2] || defaultTheme.accent,
          textLight: isColorDark(colors[0]) ? '#ffffff' : '#000000',
          textDark: isColorDark(colors[0]) ? '#000000' : '#ffffff'
        };
        setThemeColors(theme);
      };
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
      setPokemonData(null);
      setSpriteColors([]);
      setThemeColors(defaultTheme);
    }
  };

  const quantizeColors = (pixels, colorCount) => {
    const colorMap = {};
    const colors = [];
  
    // Step 1: Reduce color space and count occurrences
    for (let i = 0; i < pixels.length; i += 4) {
      const r = Math.floor(pixels[i] / 32) * 32;
      const g = Math.floor(pixels[i + 1] / 32) * 32;
      const b = Math.floor(pixels[i + 2] / 32) * 32;
      const a = pixels[i + 3];
  
      // Skip transparent pixels and black pixels
      if (a === 0 || (r === 0 && g === 0 && b === 0)) continue;
  
      const key = `${r},${g},${b}`;
      colorMap[key] = (colorMap[key] || 0) + 1;
    }
  
    // Step 2: Sort colors by frequency
    const sortedColors = Object.entries(colorMap)
      .sort((a, b) => b[1] - a[1])
      .map(([color]) => color.split(',').map(Number));
  
    // Step 3: Convert to hex and take the top colors
    for (let i = 0; i < sortedColors.length && colors.length < colorCount; i++) {
      const [r, g, b] = sortedColors[i];
      const hexColor = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
      if (hexColor !== '#000000') {
        colors.push(hexColor);
      }
    }
  
    // Step 4: If we don't have enough colors, add some default ones (avoiding black)
    while (colors.length < colorCount) {
      const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
      if (randomColor !== '#000000') {
        colors.push(randomColor);
      }
    }
  
    return colors;
  };

  const isColorDark = (hexColor) => {
    if (!hexColor) return false;
    const rgb = parseInt(hexColor.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >>  8) & 0xff;
    const b = (rgb >>  0) & 0xff;
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luma < 128;
  };

  return (
    <div className="App" style={{ backgroundColor: themeColors.primary }}>
      <SearchBar onSearch={searchPokemon} theme={themeColors} />
      {pokemonData && (
        <PokemonInfo 
          pokemon={pokemonData} 
          spriteColors={spriteColors} 
          theme={themeColors} 
        />
      )}
      <Footer theme={themeColors} />
    </div>
  );
};

export default App;