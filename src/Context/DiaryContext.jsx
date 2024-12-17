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
//createContext() => is just a global space for sharing data
//DiaryProvider => is a Component that holds data and functions for other components to use without using props or drilling
//{Children} => special prop react passes auto

//entries => name i saved the diary entries
//setEntries => func to update entries
//savedEntries => get the saved entries from localstorage with getItem
// IF EMPTY=>  use empty array []
//selectedEntry => is for saving temp the card that i clicked on
//Modal => uses bools that determines if ebtry is open or not
// useEffect => need it for rendering when entries changed to save it to localstorage
//save=> dont forget its setItem and stringify json(look it up again!)
//updateEntries => func for updating
//openEntryModal => for use of the selected entry?
//closeEntryModal => closing use togling
//toggleAddModal => does what it should
//Provider => wrap everything in it and define what needs it
//forgot to export and got stuck for 20 min
//now wrap it around => Home.jsx i think????? or App.jsx
