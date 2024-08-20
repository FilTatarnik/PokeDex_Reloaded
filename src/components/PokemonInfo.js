import React from 'react';
import './PokemonInfo.css';

const PokemonInfo = ({ pokemon, spriteColors, theme }) => {
  if (!pokemon || !theme || !spriteColors || spriteColors.length === 0) return null;

  const getContrastColor = (hexColor) => {
    // Convert hex to RGB
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    
    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Return black or white depending on luminance
    return luminance > 0.5 ? '#000000' : '#ffffff';
  };

  // Use less dominant colors for stats, abilities, and types
  const statsColor = spriteColors[3] || theme.secondary;
  const abilitiesColor = spriteColors[4] || theme.secondary;
  const typesColor = spriteColors[5] || theme.secondary;

  return (
    <div className="pokemon-info" style={{ backgroundColor: theme.secondary, color: theme.textLight }}>
      <h2 style={{ color: theme.accent }}>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <div className="color-palette" style={{ backgroundColor: theme.textDark }}>
        <h3 style={{ color: theme.textLight }}>Color Palette:</h3>
        <div className="color-grid">
          {spriteColors.map((color, index) => (
            <div key={index} className="color-swatch" style={{ backgroundColor: color }}>
              <span style={{ color: getContrastColor(color) }}>{color}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="stats" style={{ backgroundColor: statsColor, color: getContrastColor(statsColor) }}>
        <h3>Stats:</h3>
        <ul>
          {pokemon.stats.map((stat) => (
            <li key={stat.stat.name}>
              {stat.stat.name}: {stat.base_stat}
            </li>
          ))}
        </ul>
      </div>
      <div className="abilities" style={{ backgroundColor: abilitiesColor, color: getContrastColor(abilitiesColor) }}>
        <h3>Abilities:</h3>
        <ul>
          {pokemon.abilities.map((ability) => (
            <li key={ability.ability.name}>{ability.ability.name}</li>
          ))}
        </ul>
      </div>
      <div className="types" style={{ backgroundColor: typesColor, color: getContrastColor(typesColor) }}>
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