import React from "react";
import { useGlobalContext } from "../context";
import { BsHandThumbsUp } from "react-icons/bs";

const Meal = () => {
  const { meals, loading,selectedMeal,addToFavorite } = useGlobalContext();
  if (loading) {
    return (
      <section className="section">
        <h4>Loading....</h4>
      </section>
    );
  }
  if (meals.length < 1) {
    return (
      <section className="section">
        <h4>No meal match your search term. Please try again</h4>
      </section>
    );
  }

  return (
    <section className="section-center">
      {meals?.map((singleMeal) => {
        // console.log(meals);
        const { idMeal, strMeal: title, strMealThumb: image } = singleMeal;

        return (
          <article key={idMeal} className="single-meal">
            <img
              src={image}
              alt={title}
              className="img"
              style={{ width: "300px" }}
              onClick={() => selectedMeal(idMeal)}
            />
            <footer>
              <h5>{title}</h5>
              <button className="like-btn">
                <BsHandThumbsUp onClick={()=>addToFavorite(idMeal)}/>
              </button>
            </footer>
          </article>
        );
      })}
    </section>
  );
};

export default Meal;
