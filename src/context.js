import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

const AppContext = React.createContext();

const allMealUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
const randomMeal = "https://www.themealdb.com/api/json/v1/1/random.php";

const AppProvider = ({ children }) => {
  const [loading, setLoadinng] = useState(false);
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [text, setText] = useState("");
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [favorite, setFavorite] = useState([]);

  const handleChange = (e) => {
    setText(e.target.value);
    setSearchTerm(text);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text) {
      setSearchTerm(text);
    }
  };
  const fetchMeal = async (url) => {
    setLoadinng(true);
    try {
      const { data } = await axios(url);
      if (data.meals) {
        setMeals(data.meals);
      } else {
        setMeals([]);
      }
      // console.log(data.meals);
    } catch (error) {
      console.log(error.response);
    }
    setLoadinng(false);
  };

  const fetchRandomMeal = () => {
    fetchMeal(randomMeal);
  };

  // const favoriteMeals = (idMeal) => {
  //   const favoriteMeal = meals.find((meal) => meal.idMeal === idMeal);
  //   setFavorite(favoriteMeal);
  //   console.log(favorite);
  // };

  const handleRandomMeal = () => {
    setSearchTerm("");
    setText("");
    fetchRandomMeal();
  };

  const selectedMeal = (id, favorite) => {
    let meal;
    if (favorite) {
      meal = favorite.find((selectmeal) => selectmeal.idMeal === id);
    } else {
      meal = meals.find((selectmeal) => selectmeal.idMeal === id);
    }
    setSelected(meal);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const addToFavorite = (idMeal) => {
    let favoritemeal = meals.find((meal) => meal.idMeal === idMeal);
    let alreadyFavorite = favorite.find((meal) => meal.idMeal === idMeal);
    if (alreadyFavorite) return;
    setFavorite([...favorite, favoritemeal]);
  };

  const removeFromFavorite = (idMeal) => {
    const updatedFavorite = favorite.filter((meal) => meal.idMeal !== idMeal);
    setFavorite(updatedFavorite);
  };

  useEffect(() => {
    fetchMeal(allMealUrl);
  }, []);
  useEffect(() => {
    if (!searchTerm) return;
    fetchMeal(`${allMealUrl}${searchTerm}`);
  }, [searchTerm]);

  return (
    <AppContext.Provider
      value={{
        meals,
        loading,
        handleChange,
        handleSubmit,
        searchTerm,
        text,
        fetchRandomMeal,
        handleRandomMeal,
        selectedMeal,
        selected,
        modal,
        closeModal,
        addToFavorite,
        removeFromFavorite,
        favorite,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom Hook
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
