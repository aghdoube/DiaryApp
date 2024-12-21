import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./Styles/App.css";
import Home from "./Pages/Home";
import CreateEntry from "./Components/CreateEntry";
import Entry from "./Pages/Entry";
import NotFound from "./Components/NotFound";
import Calender from "./Pages/Calender";
import Favorites from "./Pages/Favorites";
import { ButtonProvider } from "./Context/Buttons";
import { CardStylesProvider } from "./Context/CardStyles";
import { MusicPlayerProvider } from "./Context/MusicPlayerContext";
import { IziToastProvider } from "./Context/iziToastContext";
import MusicPlayer from "./Components/MusicPlayer";
import Footer from "./Components/Footer";

function App() {
  return (
    <IziToastProvider>
      <MusicPlayerProvider>
        <ButtonProvider>
          <CardStylesProvider>
            <Router>
              <div>
                <Routes>
                  <Route path="/" element={<Home />} />

                  <Route path="/createentry" element={<CreateEntry />} />
                  <Route path="/entry" element={<Entry />} />
                  <Route path="/calender" element={<Calender />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <MusicPlayer />
              </div>
            </Router>
          </CardStylesProvider>
        </ButtonProvider>
      </MusicPlayerProvider>
      <Footer />
    </IziToastProvider>
  );
}

export default App;
