import React from "react";
import { X } from "lucide-react";

const ReadEntryModal = ({ entry, onClose }) => {
  if (!entry) return null;

  return (
    <dialog open className="modal modal-open">
      <div className="modal-box">
        <h2 className="text-2xl font-bold mb-4">{entry.title}</h2>
        <p className="mb-2 flex items-center gap-2">
          <i className="fas fa-calendar-alt"></i>{" "}
          {new Date(entry.date).toLocaleDateString()}
        </p>
        {entry.imageUrl && (
          <img
            src={entry.imageUrl}
            alt={entry.title}
            className="w-full h-64 object-cover rounded-lg mb-4"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/300x200?text=No+Image";
            }}
          />
        )}
        <p className="text-lg">{entry.content}</p>
        <div className="modal-action flex justify-end">
          <button className="btn btn-ghost" onClick={onClose}>
            <X className="mr-2" /> Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ReadEntryModal;
