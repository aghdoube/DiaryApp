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

    // Add unique ID to the entry
    const entryWithId = {
      ...newEntry,
      id: uuidv4(),
    };

    // Add new entry and sort
    const updatedEntries = [...entries, entryWithId].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    setEntries(updatedEntries);
    return true;
  };

  // Open full entry modal
  const openEntryModal = (entry) => {
    setSelectedEntry(entry);
  };

  // Close entry modal
  const closeEntryModal = () => {
    setSelectedEntry(null);
  };

  return (
    <MainLayout>
      <Hero onAddEntry={() => setIsAddModalOpen(true)} />

      <Cards entries={entries} onCardClick={openEntryModal} />

      {/* Create Entry Modal */}
      <CreateEntry
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddEntry={addEntry}
      />

      {/* Entry Details Modal */}
      <EntryModal entry={selectedEntry} onClose={closeEntryModal} />
    </MainLayout>
  );
};

export default Home;
