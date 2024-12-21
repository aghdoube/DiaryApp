import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../Context/Buttons";
import "../Styles/CardStyle.css";

const Cards = ({
  entries,
  onCardClick,
  onAddToFavorites,
  onDeleteFromFavorites,
  onEditEntry,
  onDeleteEntry,
}) => {
  const [expandedEntryId, setExpandedEntryId] = useState(null);

  return (
    <div className="card-container">
      {entries.map((entry) => (
        <div key={entry.id} className="card" onClick={() => onCardClick(entry)}>
          <img src={entry.imageUrl} alt={entry.title} className="card-image" />
          <div className="card-content">
            <h2 className="card-title">{entry.title}</h2>
            <p className="card-text">
              {expandedEntryId === entry.id
                ? entry.content
                : `${entry.content.substring(0, 100)}...`}
            </p>
            <div className="card-actions">
              {onDeleteFromFavorites ? (
                <Button
                  type="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteFromFavorites(entry);
                  }}
                >
                  <i class="fas fa-trash"></i>
                </Button>
              ) : (
                <Button
                  type="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToFavorites(entry);
                  }}
                >
                  <i class="fas fa-heart"></i>
                </Button>
              )}
              <Button
                type="read"
                onClick={(e) => {
                  e.stopPropagation();
                  onCardClick(entry);
                }}
              >
                {expandedEntryId === entry.id ? (
                  <>
                    <i className="fas fa-times"></i>{" "}
                  </>
                ) : (
                  <>
                    <i className="fas fa-glasses"></i>{" "}
                  </>
                )}
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Button>

              <Button
                type="edit"
                onClick={(e) => {
                  e.stopPropagation();
                  onEditEntry(entry);
                }}
              >
                <i class="fas fa-edit"></i>
              </Button>
              {onDeleteEntry && (
                <Button
                  type="delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteEntry(entry);
                  }}
                >
                  <i class="fas fa-trash"></i>
                </Button>
              )}
            </div>
          </div>
          <div className="card-date">
            {new Date(entry.date).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
};

Cards.propTypes = {
  entries: PropTypes.array.isRequired,
  onCardClick: PropTypes.func,
  onAddToFavorites: PropTypes.func,
  onDeleteFromFavorites: PropTypes.func,
  onEditEntry: PropTypes.func.isRequired,
  onDeleteEntry: PropTypes.func,
};

export default Cards;
