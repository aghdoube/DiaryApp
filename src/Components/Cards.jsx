import React from "react";
import "../Styles/Cards.css"; // Ensure the CSS file is imported

const Cards = ({ entries, onCardClick }) => {
  return (
    <div className="cards-container">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="card max-w-sm bg-[#deecee] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <div onClick={() => onCardClick(entry)} className="cursor-pointer">
            <img
              className="rounded-t-lg w-full h-48 object-cover"
              src={entry.imageUrl || "https://picsum.photos/400"}
              alt={entry.title}
              onError={(e) => {
                e.target.src = "https://picsum.photos/400";
              }}
            />
            <div className="card-content p-5">
              <h5 className="card-title mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {entry.title}
              </h5>
              <p className="card-text mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-3">
                {entry.content}
              </p>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onCardClick(entry);
                }}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Read Entry
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
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
