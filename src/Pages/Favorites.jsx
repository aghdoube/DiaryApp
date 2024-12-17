import React, { useState, useEffect } from "react";
import MainLayout from "../Layouts/MainLayout";
import Cards from "../Components/Cards";
import Logo4 from "../assets/logo4.jpg";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(savedFavorites);
  }, []);

  return (
    <MainLayout>
      <div className="favorites-container flex flex-col items-center mt-[150px]">
        <div className="relative w-full max-w-2xl">
          <img src={Logo4} alt="Logo" className="w-full h-auto" />
          <h1 className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10">
            Your Favorites
          </h1>
        </div>
        <div className="w-full max-w-2xl mt-8">
          {favorites.length > 0 ? (
            <Cards entries={favorites} onCardClick={() => {}} />
          ) : (
            <p>No favorite entries found.</p>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Favorites;
