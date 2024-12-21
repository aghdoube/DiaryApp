import React, { useState, useEffect } from "react";
import MainLayout from "../Layouts/MainLayout";
import Cards from "../Components/Cards";

import "../Styles/CardStyle.css";
import EntryModal from "../Components/EntryModal";

import { useIziToast } from "../Context/iziToastContext";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const { showToast } = useIziToast();
  const [selectedEntryToEdit, setSelectedEntryToEdit] = useState(null);

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
    showToast(
      "success",
      "Deleted",
      "The entry has been removed from favorites."
    );
  };

  const handleEditEntry = (entry) => {
    setSelectedEntryToEdit(entry);
  };

  const handleSaveEditedEntry = (editedEntry) => {
    const updatedFavorites = favorites.map((entry) =>
      entry.id === editedEntry.id ? editedEntry : entry
    );

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setSelectedEntryToEdit(null);
    showToast("success", "Updated", "The entry has been updated.");
  };

  return (
    <MainLayout>
      <div className="favorites-container flex flex-col items-center mt-[150px]">
        <div className="relative w-full max-w-4xl">
          <h1
            className="favorite absolute top-0 left-0 w-full h-full flex items-center justify-center text-white text-4xl z-10"
            style={{
              fontSize: "4rem",
              margin: 0,
              color: "#ecbe80",
              fontFamily: '"Merriweather", serif',
              fontWeight: 400,
              fontStyle: "italic",
            }}
          >
            My Favorites
          </h1>
        </div>
        <div className="w-full max-w-4xl mt-8">
          {favorites.length > 0 ? (
            <Cards
              entries={favorites}
              onCardClick={() => {}}
              onDeleteFromFavorites={deleteFromFavorites}
              onEditEntry={handleEditEntry}
            />
          ) : (
            <p>No favorite entries found.</p>
          )}
        </div>
      </div>
      {selectedEntryToEdit && (
        <EntryModal
          entry={selectedEntryToEdit}
          onClose={() => setSelectedEntryToEdit(null)}
          onSave={handleSaveEditedEntry}
        />
      )}
    </MainLayout>
  );
};

export default Favorites;
