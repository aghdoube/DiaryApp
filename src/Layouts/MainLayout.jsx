import React from "react";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

import "../Styles/MusicPlayer.css";

const MainLayout = ({ children }) => {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
};

export default MainLayout;
