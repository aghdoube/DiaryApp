import React, { useState, useEffect } from "react";
import MainLayout from "../Layouts/MainLayout";
import Cards from "../Components/Cards";

const Entry = () => {
  const [entries, setEntries] = useState([]);

  // Load entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = JSON.parse(
      localStorage.getItem("diaryEntries") || "[]"
    );
    setEntries(savedEntries);
  }, []);

  // Add entry to favorites
  const addToFavorites = (entry) => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (!favorites.some((fav) => fav.id === entry.id)) {
      favorites.push(entry);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      alert("Entry added to favorites!");
    } else {
      alert("Entry is already in favorites!");
    }
  };

  return (
    <MainLayout>
      <div className="entries-container">
        <h1>Entries</h1>
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
    </MainLayout>
  );
};

export default Entry;
