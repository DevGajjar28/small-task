import React, { useState, useEffect } from "react";
import axios from "axios";
import PokemonCard from "./PokemonCard";
import SearchBar from "./SearchBar";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=100"
      );
      const pokemonData = await Promise.all(
        response.data.results.map(async (pokemon) => {
          const pokemonDetails = await axios.get(pokemon.url);
          return pokemonDetails.data;
        })
      );
      setPokemons(pokemonData);
    };

    fetchPokemons();
  }, []);

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="pokemon-list">
        {filteredPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
