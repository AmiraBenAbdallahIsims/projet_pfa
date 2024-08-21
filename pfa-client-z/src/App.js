import React from "react";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./components/welcome-page"; // Ensure the path is correct
import Login from "./components/login-signup/login"; // Your login page component
import Signup from "./components/login-signup/signup"; // Your signup page component^
import Templates from "./components/Templates";
import Card from "./components/v.card/card";
import WelcomeDesigner from './components/welcome-designer'
import SideNav from "./components/sidenav";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Card />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/welcome-designer" element={<WelcomeDesigner />} />
        <Route path="/Templates" element={<Templates />} />
        
      </Routes>
    </Router>
  );
}

export default App;
