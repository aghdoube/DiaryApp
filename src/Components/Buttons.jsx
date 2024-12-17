import React, { createContext, useContext } from "react";
import "../Styles/Button.css";

const ButtonContext = createContext();

export const ButtonProvider = ({ children }) => {
  const buttonStyles = {
    primary: "button-primary",
    secondary: "button-secondary",
    delete: "button-delete",
    read: "button-read",
  };

  return (
    <ButtonContext.Provider value={buttonStyles}>
      {children}
    </ButtonContext.Provider>
  );
};

const Button = ({ type, children, onClick }) => {
  const buttonStyles = useContext(ButtonContext);

  return (
    <button className={buttonStyles[type]} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
