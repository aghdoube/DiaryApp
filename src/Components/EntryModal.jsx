import React from "react";
import { Calendar } from "lucide-react";

const EntryModal = ({ entry, onClose }) => {
  if (!entry) return null;

  return (
    <dialog open className="modal modal-open">
      <div className="modal-box">
        <h2 className="text-2xl font-bold mb-4">{entry.title}</h2>
        <p className="mb-2 flex items-center gap-2">
          <Calendar size={16} /> {entry.date}
        </p>
        <img
          src={entry.imageUrl}
          alt={entry.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
          }}
        />
        <p>{entry.content}</p>
        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default EntryModal;
