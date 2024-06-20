import React from "react";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search Pokémon..."
      
    />
  );
};

export default SearchBar;
