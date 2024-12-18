import React from "react";
import heroImage from "../assets/Hero.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeatherAlt } from "@fortawesome/free-solid-svg-icons";

import "../styles/Hero.css";

const Hero = ({ onAddEntry }) => {
  return (
    <div className="hero-container">
      <div className="hero">
        <img src={heroImage} alt="Hero" className="hero-image" />
        <div className="hero-text">
          <h1>
            Mind <FontAwesomeIcon icon={faFeatherAlt} />
            Keeper
          </h1>
          <h2>Where Your Thoughts Find a Home.</h2>
          <button
            onClick={onAddEntry}
            className=" button bg-sky-200 hover:bg-indigo-500 text-gray-700 font-bold py-2 px-4 rounded"
          >
            Add New Entry
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
