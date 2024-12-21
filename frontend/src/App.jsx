import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home";
import Results from "./pages/Results";
const App = () => {
  return (
    <Router>
      {/* Navbar included at the top */}
      <NavBar />

      <main className="flex-grow">
        <Routes>
          {/* Home route */}
          <Route path="/" element={<Home />} />

          {/* Design page route */}
          <Route path="/result" element={<Results />} />
        </Routes>
      </main>

      {/* Footer included at the bottom */}
      <Footer />
    </Router>
  );
};

export default App;
