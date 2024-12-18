import React, { useState, useEffect } from "react";
import MainLayout from "../Layouts/MainLayout";
import Cards from "../Components/Cards";
import Logo3 from "../assets/logo3.jpg";
import "../Styles/CardStyle.css";
import { useIziToast } from "../Context/iziToastContext";

const Entry = () => {
  const [entries, setEntries] = useState([]);
  const { showToast } = useIziToast();

  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem("entries") || "[]");
    setEntries(savedEntries);
  }, []);

  const addToFavorites = (entry) => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (!favorites.some((fav) => fav.id === entry.id)) {
      const updatedFavorites = [...favorites, entry];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      showToast("success", "Added", "The entry has been added to favorites.");
    } else {
      showToast("info", "Already Added", "The entry is already in favorites.");
    }
  };

  return (
    <MainLayout>
      <div className="entries-container flex flex-col items-center mt-[150px]">
        <div className="relative w-full max-w-4xl">
          <img src={Logo3} alt="Logo" className="w-full h-auto" />
          <h1 className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10">
            Chronicles
          </h1>
        </div>
        <div className="w-full max-w-4xl mt-8">
          {entries.length > 0 ? (
            <Cards
              entries={entries}
              onCardClick={() => {}}
              onAddToFavorites={addToFavorites}
            />
          ) : (
            <p>No entries found. Please add some entries.</p>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Entry;
