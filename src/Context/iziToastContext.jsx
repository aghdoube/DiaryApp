import React, { createContext, useContext } from "react";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const iziToastContext = createContext();

export const useIziToast = () => {
  return useContext(iziToastContext);
};

export const IziToastProvider = ({ children }) => {
  const showToast = (type, title, message) => {
    iziToast[type]({
      title: title,
      message: message,
      position: "bottomRight",
    });
  };

  return (
    <iziToastContext.Provider value={{ showToast }}>
      {children}
    </iziToastContext.Provider>
  );
};
