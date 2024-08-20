import React from 'react';
import './PokemonInfo.css';

const PokemonInfo = ({ pokemon, spriteColor }) => {
  const formatColor = (color) => {
    if (!color) return 'N/A';
    if (Array.isArray(color)) return color.join(', ');
    if (typeof color === 'object') return `${color.r}, ${color.g}, ${color.b}`;
    return color;
  };

  return (
    <div className="pokemon-info">
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      {spriteColor && (
        <div className="color-info" style={{ backgroundColor: spriteColor.hex }}>
          <h3>Color Information:</h3>
          <p>Hex: {spriteColor.hex}</p>
          <p>RGB: {formatColor(spriteColor.rgb)}</p>
          <p>RGBA: {formatColor(spriteColor.rgba)}</p>
          <p>Is Dark: {spriteColor.isDark ? 'Yes' : 'No'}</p>
        </div>
      )}

    <div className="color-grid">
        <div className="color-swatch" style={{backgroundColor: spriteColor.hex}}>
        {spriteColor.hex}
        </div>
        {/* Add more swatches here if needed */}
    </div>

      <div className="stats">
        <h3>Stats:</h3>
        <ul>
          {pokemon.stats.map((stat) => (
            <li key={stat.stat.name}>
              {stat.stat.name}: {stat.base_stat}
            </li>
          ))}
        </ul>
      </div>
      <div className="abilities">
        <h3>Abilities:</h3>
        <ul>
          {pokemon.abilities.map((ability) => (
            <li key={ability.ability.name}>{ability.ability.name}</li>
          ))}
        </ul>
      </div>
      <div className="types">
        <h3>Types:</h3>
        <ul>
          {pokemon.types.map((type) => (
            <li key={type.type.name}>{type.type.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonInfo;