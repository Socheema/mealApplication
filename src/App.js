import React from "react";
import Search from "./components/Search";
import Favorites from "./components/Favorites";
import Meal from "./components/Meal";
import Modal from "./components/Modal";
import { useGlobalContext } from "./context";

const App = () => {
  const { favorite, modal } = useGlobalContext();
  return (
    <>
      <Search />
      {favorite.length > 0 && <Favorites />}
      <Meal />
      {modal && <Modal />}
    </>
  );
};
export default App;
