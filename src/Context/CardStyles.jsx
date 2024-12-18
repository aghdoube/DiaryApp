import React, { createContext, useContext } from "react";
import "../Styles/CardStyle.css";

const CardStylesContext = createContext();

export const CardStylesProvider = ({ children }) => {
  const cardStyles = {
    container: "card-container",
    card: "card",
    image: "card-image",
    content: "card-content",
    title: "card-title",
    text: "card-text",
    date: "card-date",
  };

  return (
    <CardStylesContext.Provider value={cardStyles}>
      {children}
    </CardStylesContext.Provider>
  );
};

export const useCardStyles = () => {
  return useContext(CardStylesContext);
};
