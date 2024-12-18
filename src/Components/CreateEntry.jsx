import React, { useState } from "react";
import { format } from "date-fns";
import { Book, Calendar, Image as ImageIcon, FileText } from "lucide-react";
import { useIziToast } from "../Context/iziToastContext";
import "../Styles/CreateEntry.css";

const CreateEntry = ({ isOpen, onClose, onAddEntry }) => {
  const [newEntry, setNewEntry] = useState({
    title: "",
    date: format(new Date(), "yyyy-MM-dd"),
    imageUrl: "",
    content: "",
  });

  const { showToast } = useIziToast();

  const handleAddEntry = (e) => {
    e.preventDefault();

    if (
      !newEntry.title ||
      !newEntry.date ||
      !newEntry.imageUrl ||
      !newEntry.content
    ) {
      showToast("error", "Incomplete", "Please fill in all fields");
      return;
    }

    const entryAdded = onAddEntry(newEntry);

    if (entryAdded) {
      setNewEntry({
        title: "",
        date: format(new Date(), "yyyy-MM-dd"),
        imageUrl: "",
        content: "",
      });
      showToast(
        "success",
        "",
        "A new page in your life’s story has been written.."
      );
      onClose();
    } else {
      showToast("Error", "Failed to save the entry.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="page-container">
        <h1 className="page-header">Create a New Diary Entry</h1>
        <form onSubmit={handleAddEntry} className="entry-form">
          <div className="entry-section">
            <label className="entry-label">
              <Book size={16} /> Title
            </label>
            <input
              type="text"
              value={newEntry.title}
              onChange={(e) =>
                setNewEntry({ ...newEntry, title: e.target.value })
              }
              className="entry-input"
              placeholder="Enter the title of your entry"
            />
          </div>
          <div className="entry-section">
            <label className="entry-label">
              <Calendar size={16} /> Date
            </label>
            <input
              type="date"
              value={newEntry.date}
              onChange={(e) =>
                setNewEntry({ ...newEntry, date: e.target.value })
              }
              className="entry-input"
            />
          </div>
          <div className="entry-section">
            <label className="entry-label">
              <ImageIcon size={16} /> Image URL
            </label>
            <input
              type="text"
              value={newEntry.imageUrl}
              onChange={(e) =>
                setNewEntry({ ...newEntry, imageUrl: e.target.value })
              }
              className="entry-input"
              placeholder="Optional: Add an image URL"
            />
          </div>
          <div className="entry-section">
            <label className="entry-label">
              <FileText size={16} /> Content
            </label>
            <textarea
              value={newEntry.content}
              onChange={(e) =>
                setNewEntry({ ...newEntry, content: e.target.value })
              }
              className="entry-textarea"
              placeholder="Write the content of your diary entry here..."
            />
          </div>

          <div className="page-actions">
            <button type="submit" className="btn-save">
              Save Entry
            </button>
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEntry;
