import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import MainLayout from "../Layouts/MainLayout";
import Hero from "../Components/Hero";
import Cards from "../Components/Cards";
import CreateEntry from "../Components/CreateEntry";
import EntryModal from "../Components/EntryModal";

const Home = () => {
  const [entries, setEntries] = useState(() => {
    const savedEntries = localStorage.getItem("diaryEntries");
    return savedEntries ? JSON.parse(savedEntries) : [];
  });
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("diaryEntries", JSON.stringify(entries));
      console.log("Entries saved to localStorage:", entries);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      alert("Unable to save entries. Please check your browser settings.");
    }
  }, [entries]);

  const checkEntryExists = (date) => {
    return entries.some((entry) => entry.date === date);
  };

  const addEntry = (newEntry) => {
    if (checkEntryExists(newEntry.date)) {
      alert(
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
      console.log("This entry is already in your favorites.");
      return;
    }

    savedFavorites.push(entry);

    localStorage.setItem("favorites", JSON.stringify(savedFavorites));

    console.log("Added to favorites:", entry);
  };

  return (
    <MainLayout>
      <Hero onAddEntry={() => setIsAddModalOpen(true)} />

      <Cards
        entries={entries}
        onCardClick={openEntryModal}
        onAddToFavorites={handleAddToFavorites}
      />

      <CreateEntry
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddEntry={addEntry}
      />

      <EntryModal entry={selectedEntry} onClose={closeEntryModal} />
    </MainLayout>
  );
};

export default Home;
