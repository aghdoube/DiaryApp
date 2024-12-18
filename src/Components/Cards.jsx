import React, { useState } from "react";
import Button from "../Context/Buttons";
import { useCardStyles } from "../Context/CardStyles";

const Cards = ({
  entries,
  onCardClick,
  onAddToFavorites,
  onDeleteFromFavorites,
  isFavoriteList,
}) => {
  const cardStyles = useCardStyles();
  const [expandedEntryId, setExpandedEntryId] = useState(null);

  const handleReadEntry = (entryId) => {
    setExpandedEntryId(expandedEntryId === entryId ? null : entryId);
  };

  return (
    <div className={cardStyles.container}>
      {entries.map((entry) => (
        <div key={entry.id} className={cardStyles.card}>
          <div onClick={() => onCardClick(entry)} className="cursor-pointer">
            <img
              className={cardStyles.image}
              src={entry.imageUrl || "https://picsum.photos/400"}
              alt={entry.title}
              onError={(e) => {
                e.target.src = "https://picsum.photos/400";
              }}
            />
            <div className={cardStyles.content}>
              <h5 className={cardStyles.title}>{entry.title}</h5>
              <p
                className={`${cardStyles.text} ${
                  expandedEntryId === entry.id ? "expanded" : ""
                }`}
              >
                {entry.content}
              </p>
              <div className="flex justify-between items-center">
                {isFavoriteList ? (
                  <Button
                    type="delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteFromFavorites(entry);
                    }}
                  >
                    Delete from Favorites
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToFavorites(entry);
                    }}
                  >
                    Add to Favorites
                  </Button>
                )}
                <Button
                  type="read"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReadEntry(entry.id);
                  }}
                >
                  {expandedEntryId === entry.id ? "Hide Entry" : "Read Entry"}
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
              </div>
            </div>
          </div>
          <div className={cardStyles.date}>
            {new Date(entry.date).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
