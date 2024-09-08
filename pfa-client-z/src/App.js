import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./components/Welcome-Page/welcome-page";
import Login from "./components/login-signup/login";
import Signup from "./components/login-signup/signup";
import Templates from "./components/Templates-slide/Templates";
import Card from "./components/v.card/card";
import SlideDiv from "./components/Templates-slide/slide/slide-div";
import SideNav from "./components/general-compo/sidenav";
import TemplatesLog from "./components/Designer/Templates-menu/Templates-log";
import Projects from "./components/Designer/Projects-menu/projects";
import FloatingMetrics from "./components/Designer/Stat-menu/components/FloatingMetrics";
import Home from "./components/Designer/Stat-menu/stat";
import Feed from "./components/Designer/Feed-menu/feed";
import ModifCard from "./components/Designer/modif-card/modif-card";
import Template from "./components/templateComponent/template";
import ShowCard from "./components/Designer/card-showroom/card-show";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Templates />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/SideNav" element={<SideNav />} />
        <Route path="/SlideDiv" element={<SlideDiv />} />
        <Route path="/TemplatesSide" element={<TemplatesLog />} />
        <Route path="/Projects" element={<Projects />} />
        <Route path="/FloatingMetrics" element={<FloatingMetrics />} />
        <Route path="/templates/:templateName" element={<Template />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Feed" element={<Feed />} />
        <Route path="/templates/tati" element={<ModifCard />} />
        <Route path="/templates/:templateCardName/:templateId" element={<ModifCard />} />
        <Route path="/templates/:templateCardName/:templateId/show" element={<ShowCard />} />
      </Routes>
    </Router>
  );
}

export default App;
