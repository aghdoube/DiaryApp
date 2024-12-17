import React, { useState, useEffect } from "react";
import MainLayout from "../Layouts/MainLayout";
import Cards from "../Components/Cards";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(savedFavorites);
  }, []);

  return (
    <MainLayout>
      <div className="favorites-container">
        <h1>Your Favorites</h1>
        {favorites.length > 0 ? (
          <Cards entries={favorites} onCardClick={() => {}} />
        ) : (
          <p>No favorite entries found.</p>
        )}
      </div>
    </MainLayout>
  );
};

export default Favorites;
