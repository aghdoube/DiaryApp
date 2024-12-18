import React, { useState, useEffect } from "react";
import MainLayout from "../Layouts/MainLayout";
import Cards from "../Components/Cards";
import EntryModal from "../Components/EntryModal"; // Assume this is the modal component you showed earlier
import Logo3 from "../assets/logo3.jpg";
import "../Styles/CardStyle.css";
import { useIziToast } from "../Context/iziToastContext";

const Entry = () => {
  const [entries, setEntries] = useState([]);
  const [selectedEntryToEdit, setSelectedEntryToEdit] = useState(null);
  const { showToast } = useIziToast();

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
      showToast("success", "Added", "The entry has been added to favorites.");
    } else {
      showToast("info", "Already Added", "The entry is already in favorites.");
    }
  };

  const handleEditEntry = (entry) => {
    setSelectedEntryToEdit(entry);
  };

  const handleSaveEditedEntry = (editedEntry) => {
    const updatedEntries = entries.map((entry) =>
      entry.id === editedEntry.id ? editedEntry : entry
    );

    setEntries(updatedEntries);
    localStorage.setItem("diaryEntries", JSON.stringify(updatedEntries));
    setSelectedEntryToEdit(null);
    showToast("success", "Updated", "The entry has been updated.");
  };

  const handleDeleteEntry = (entry) => {
    const updatedEntries = entries.filter((e) => e.id !== entry.id);
    setEntries(updatedEntries);
    localStorage.setItem("diaryEntries", JSON.stringify(updatedEntries));
    showToast("success", "Deleted", "The entry has been deleted.");
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
              onEditEntry={handleEditEntry}
              onDeleteEntry={handleDeleteEntry}
            />
          ) : (
            <p>No entries found. Please add some entries.</p>
          )}
        </div>
      </div>

      {/* Modal for editing entries */}
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

export default Entry;
