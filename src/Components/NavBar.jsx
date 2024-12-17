import React from "react";
import { Link } from "react-router-dom";
import "../Styles/NavBar.css";
import logoImage from "../assets/quil.png";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logoImage} alt="Logo" className="navbar-logo-img" />
          <span className="navbar-logo-text">DIARY</span>
        </Link>
        <div className="navbar-links" id="navbar-menu">
          <ul className="navbar-links-list">
            <li>
              <Link to="/" className="navbar-link">
                <i
                  className="fas fa-home navbar-icon"
                  style={{ color: "#c78fcc" }}
                ></i>{" "}
                Home
              </Link>
            </li>
            <li>
              <Link to="/entry" className="navbar-link">
                <i
                  className="fas fa-book  navbar-icon"
                  style={{ color: "#c78fcc" }}
                ></i>{" "}
                Chronicles
              </Link>
            </li>
            <li>
              <Link to="/favorites" className="navbar-link">
                <i
                  className="fas fa-heart  navbar-icon"
                  style={{ color: "#c78fcc" }}
                ></i>{" "}
                Favorites
              </Link>
            </li>
            <li>
              <Link to="/calender" className="navbar-link">
                <i
                  className="fas fa-calendar navbar-icon"
                  style={{ color: "#c78fcc" }}
                ></i>{" "}
                Events
              </Link>
            </li>
          </ul>
        </div>

        <button
          className="navbar-toggle"
          aria-controls="navbar-menu"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="navbar-toggle-icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
