import React, { createContext, useState, useEffect } from "react";

const DiaryContext = createContext();

const DiaryProvider = ({ children }) => {
  const [entries, setEntries] = useState(() => {
    const savedEntries = localStorage.getItem("diaryEntries");
    return savedEntries ? JSON.parse(savedEntries) : [];
  });

  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("diaryEntries", JSON.stringify(entries));
  }, [entries]);

  const updateEntries = (newEntries) => {
    setEntries(newEntries);
  };

  const openEntryModal = (entry) => {
    setSelectedEntry(entry);
  };

  const closeEntryModal = () => {
    setSelectedEntry(null);
  };

  const toggleAddModal = () => {
    setIsAddModalOpen(!isAddModalOpen);
  };

  return (
    <DiaryContext.Provider
      value={{
        entries,
        selectedEntry,
        isAddModalOpen,
        updateEntries,
        openEntryModal,
        closeEntryModal,
        toggleAddModal,
      }}
    >
      {children}
    </DiaryContext.Provider>
  );
};

export { DiaryContext, DiaryProvider };
