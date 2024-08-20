import React from 'react';
import './PokemonInfo.css';

const PokemonInfo = ({ pokemon, spriteColors }) => {
  return (
    <div className="pokemon-info">
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      {spriteColors && (
        <div className="color-info">
          <h3>Color Palette:</h3>
          <div className="color-grid">
            {spriteColors.map((color, index) => (
              <div key={index} className="color-swatch" style={{ backgroundColor: color }}>
                <span>{color}</span>
              </div>
            ))}
          </div>
        </div>
      )}
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