import React, { useState } from "react";
import { format } from "date-fns";
import { Book, Calendar, Image as ImageIcon, FileText } from "lucide-react";

const CreateEntry = ({ isOpen, onClose, onAddEntry }) => {
  const [newEntry, setNewEntry] = useState({
    title: "",
    date: format(new Date(), "yyyy-MM-dd"),
    imageUrl: "",
    content: "",
  });

  const handleAddEntry = (e) => {
    e.preventDefault();

    if (
      !newEntry.title ||
      !newEntry.date ||
      !newEntry.imageUrl ||
      !newEntry.content
    ) {
      alert("Please fill in all fields");
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
      onClose();
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
              placeholder="Enter entry title"
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
              placeholder="Enter image URL"
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
              placeholder="Write your diary entry"
              className="textarea textarea-bordered h-24"
            />
          </div>
          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Entry
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default CreateEntry;
