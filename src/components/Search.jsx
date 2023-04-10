import React, { useState } from "react";
import { useGlobalContext } from "../context";

const Search = () => {
  const { handleChange, handleSubmit, text, handleRandomMeal } =
    useGlobalContext();

  //  console.log(text);

  return (
    <header className="search-container">
      <form onSubmit={handleSubmit}> 
        <input
          type="text"
          placeholder="Type favorite meal"
          onChange={handleChange}
          className="form-input"
          value={text}
        />
        <button className="btn" type="submit" onClick={handleSubmit}>
          Search
        </button>
        <button
          className="btn btn-hipster"
          type="button"
          onClick={handleRandomMeal}
        >
          Suprise me
        </button>
      </form>
    </header>
  );
};

export default Search;
