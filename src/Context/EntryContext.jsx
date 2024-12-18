import React, { createContext, useContext, useState, useEffect } from "react";

const EntryContext = createContext();

export const EntryProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const savedEntries = JSON.parse(
      localStorage.getItem("diaryEntries") || "[]"
    );
    setEntries(savedEntries);
  }, []);

  const addToFavorites = (entry) => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (!favorites.some((fav) => fav.id === entry.id)) {
      const updatedFavorites = [...favorites, entry];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  const editEntry = (editedEntry) => {
    const updatedEntries = entries.map((entry) =>
      entry.id === editedEntry.id ? editedEntry : entry
    );
    setEntries(updatedEntries);
    localStorage.setItem("diaryEntries", JSON.stringify(updatedEntries));
  };

  const deleteEntry = (entry) => {
    const updatedEntries = entries.filter((e) => e.id !== entry.id);
    setEntries(updatedEntries);
    localStorage.setItem("diaryEntries", JSON.stringify(updatedEntries));
  };

  return (
    <EntryContext.Provider
      value={{
        entries,
        addToFavorites,
        editEntry,
        deleteEntry,
      }}
    >
      {children}
    </EntryContext.Provider>
  );
};

export const useEntryContext = () => useContext(EntryContext);
