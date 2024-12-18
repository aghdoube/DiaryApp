import React, { useState, useEffect } from "react";
import { Calendar, Save, X } from "lucide-react";

const EntryModal = ({ entry, onClose, onSave }) => {
  const [editedEntry, setEditedEntry] = useState({ ...entry });

  useEffect(() => {
    setEditedEntry({ ...entry });
  }, [entry]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEntry((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (!editedEntry.title.trim()) {
      alert("Title cannot be empty");
      return;
    }

    onSave(editedEntry);
    onClose();
  };

  if (!entry) return null;

  return (
    <dialog open className="modal modal-open">
      <div className="modal-box">
        <h2 className="text-2xl font-bold mb-4">
          <input
            type="text"
            name="title"
            value={editedEntry.title}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            placeholder="Entry Title"
          />
        </h2>

        <p className="mb-2 flex items-center gap-2">
          <Calendar size={16} />
          <input
            type="date"
            name="date"
            value={new Date(editedEntry.date).toISOString().split("T")[0]}
            onChange={handleInputChange}
            className="input input-bordered"
          />
        </p>

        <input
          type="text"
          name="imageUrl"
          value={editedEntry.imageUrl}
          onChange={handleInputChange}
          className="input input-bordered w-full mb-4"
          placeholder="Image URL"
        />

        <img
          src={editedEntry.imageUrl}
          alt={editedEntry.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
          }}
        />

        <textarea
          name="content"
          value={editedEntry.content}
          onChange={handleInputChange}
          className="textarea textarea-bordered w-full h-40"
          placeholder="Entry Content"
        />

        <div className="modal-action flex justify-between">
          <button className="btn btn-ghost" onClick={onClose}>
            <X className="mr-2" /> Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            <Save className="mr-2" /> Save Changes
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default EntryModal;
