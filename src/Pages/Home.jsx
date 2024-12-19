import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import MainLayout from "../Layouts/MainLayout";
import Hero from "../Components/Hero";
import Cards from "../Components/Cards";
import CreateEntry from "../Components/CreateEntry";
import EntryModal from "../Components/EntryModal";
import { useIziToast } from "../Context/iziToastContext";

const Home = () => {
  const [entries, setEntries] = useState(() => {
    const savedEntries = localStorage.getItem("diaryEntries");
    return savedEntries ? JSON.parse(savedEntries) : [];
  });
  const [selectedEntryToEdit, setSelectedEntryToEdit] = useState(null);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { showToast } = useIziToast();

  useEffect(() => {
    try {
      localStorage.setItem("diaryEntries", JSON.stringify(entries));
      console.log("Entries saved to localStorage:", entries);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      showToast(
        "error",
        "Save Error",
        "Unable to save entries. Please check your browser settings."
      );
    }
  }, [entries, showToast]);

  const checkEntryExists = (date) => {
    return entries.some((entry) => entry.date === date);
  };

  const addEntry = (newEntry) => {
    if (checkEntryExists(newEntry.date)) {
      showToast(
        "error",
        "Duplicate Entry",
        "An entry already exists for this date. Please choose another date."
      );
      return false;
    }

    const entryWithId = {
      ...newEntry,
      id: uuidv4(),
    };

    const updatedEntries = [...entries, entryWithId].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    setEntries(updatedEntries);
    showToast(
      "success",
      "Entry Added",
      "The new entry has been added successfully."
    );
    return true;
  };

  const openEntryModal = (entry) => {
    setSelectedEntry(entry);
  };

  const closeEntryModal = () => {
    setSelectedEntry(null);
  };

  const handleAddToFavorites = (entry) => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const isDuplicate = savedFavorites.some((fav) => fav.id === entry.id);

    if (isDuplicate) {
      showToast(
        "info",
        "Already Added",
        "This entry is already in your favorites."
      );
      return;
    }

    savedFavorites.push(entry);
    localStorage.setItem("favorites", JSON.stringify(savedFavorites));
    showToast(
      "success",
      "Added to Favorites",
      "The entry has been added to your favorites."
    );
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
      <Hero onAddEntry={() => setIsAddModalOpen(true)} />

      <Cards
        entries={entries}
        onCardClick={openEntryModal}
        onAddToFavorites={handleAddToFavorites}
        onEditEntry={handleEditEntry}
        onDeleteEntry={handleDeleteEntry}
      />

      <CreateEntry
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddEntry={addEntry}
      />

      {selectedEntry && (
        <EntryModal
          entry={selectedEntry}
          onClose={closeEntryModal}
          onSave={handleSaveEditedEntry}
        />
      )}
      {selectedEntryToEdit && (
        <EntryModal
          entry={selectedEntryToEdit}
          onSave={handleSaveEditedEntry}
          onClose={() => setSelectedEntryToEdit(null)}
        />
      )}
    </MainLayout>
  );
};

export default Home;
