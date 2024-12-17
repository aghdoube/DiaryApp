import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./Styles/App.css";
import Home from "./Pages/Home";
import CreateEntry from "./Components/CreateEntry";
import Entry from "./Pages/Entry";
import NotFound from "./Components/NotFound";
import Calender from "./Pages/Calender";
import Favorites from "./Pages/Favorites";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notfound" element={<NotFound />} />
          <Route path="/createentry" element={<CreateEntry />} />
          <Route path="/entry" element={<Entry />} />
          <Route path="/calender" element={<Calender />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
