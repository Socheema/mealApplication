import React from "react";
import { useGlobalContext } from "../context";

const Favorites = () => {
  const { favorite, removeFromFavorite,selectedMeal } = useGlobalContext();
  
  return (
    <section className="favorites">
      <div className="favorites-content">
        <h5>Favorites</h5>
        <div className="favorites-container">
          {favorite?.map((meal) => {
            const { idMeal, strMealThumb } = meal;
            return (
              <div className="favorite-item" key={idMeal}>
                <img
                  src={strMealThumb}
                  alt="image"
                  className="img favorites-img"
                  onClick={() => selectedMeal(idMeal)}
                />
                <button
                  className="remove-btn"
                  onClick={() => removeFromFavorite(idMeal)}
                >remove</button>
              </div>
            );
          })}
         
        </div>
      </div>
    </section>
  );
};

export default Favorites;
