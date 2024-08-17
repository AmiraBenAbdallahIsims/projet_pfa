import React from "react";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./components/welcome-page"; // Ensure the path is correct
import Login from "./components/login"; // Your login page component
import Signup from "./components/signup"; // Your signup page component^
import Templates from "./components/Templates";
import Card from "./components/card";
import SideNav from "./components/sidenav";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Card />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Templates" element={<Templates />} />
      </Routes>
    </Router>
  );
}

export default App;
