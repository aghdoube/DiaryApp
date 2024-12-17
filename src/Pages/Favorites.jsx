import React, { useState, useEffect } from "react";
import MainLayout from "../Layouts/MainLayout";
import Cards from "../Components/Cards";
import Logo3 from "../assets/logo3.jpg";
import "../Styles/CardStyle.css";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(savedFavorites);
  }, []);

  const deleteFromFavorites = (entry) => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const updatedFavorites = favorites.filter((fav) => fav.id !== entry.id);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
    alert("Entry removed from favorites!");
  };

  return (
    <MainLayout>
      <div className="favorites-container flex flex-col items-center mt-[150px]">
        <div className="relative w-full max-w-4xl">
          {" "}
          <img src={Logo3} alt="Logo" className="w-full h-auto" />
          <h1 className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white text-4xl z-10">
            My Favorites
          </h1>
        </div>
        <div className="w-full max-w-4xl mt-8">
          {" "}
          {favorites.length > 0 ? (
            <Cards
              entries={favorites}
              onCardClick={() => {}}
              onDeleteFromFavorites={deleteFromFavorites}
              isFavoriteList={true}
            />
          ) : (
            <p>No favorite entries found.</p>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Favorites;
