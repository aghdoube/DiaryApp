import React, { useState } from "react";
import { format } from "date-fns";
import { Book, Calendar, Image as ImageIcon, FileText } from "lucide-react";
import { useIziToast } from "../Context/iziToastContext";

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
        "Entry Saved",
        "The new entry has been saved successfully."
      );
      onClose();
    } else {
      showToast("error", "Error", "Failed to save the entry.");
    }
  };

  if (!isOpen) return null;

  return (
    <dialog open className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Add New Diary Entry</h3>
        <form onSubmit={handleAddEntry}>
          <div className="form-control">
            <label className="label">
              <span className="label-text flex items-center gap-2">
                <Book size={16} /> Title
              </span>
            </label>
            <input
              type="text"
              value={newEntry.title}
              onChange={(e) =>
                setNewEntry({ ...newEntry, title: e.target.value })
              }
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text flex items-center gap-2">
                <Calendar size={16} /> Date
              </span>
            </label>
            <input
              type="date"
              value={newEntry.date}
              onChange={(e) =>
                setNewEntry({ ...newEntry, date: e.target.value })
              }
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text flex items-center gap-2">
                <ImageIcon size={16} /> Image URL
              </span>
            </label>
            <input
              type="text"
              value={newEntry.imageUrl}
              onChange={(e) =>
                setNewEntry({ ...newEntry, imageUrl: e.target.value })
              }
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text flex items-center gap-2">
                <FileText size={16} /> Content
              </span>
            </label>
            <textarea
              value={newEntry.content}
              onChange={(e) =>
                setNewEntry({ ...newEntry, content: e.target.value })
              }
              className="textarea textarea-bordered"
            />
          </div>
          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default CreateEntry;
