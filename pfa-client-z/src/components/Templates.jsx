import React from "react";
import "../App.css";

import Navbar from './navbar';
import Footer from './footer';
import ScrollImg from './scrollimg';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import TemplatesComponent from "./templates/templatesComponent";

const Templates = () => {
  return (
    <>
      <Navbar />
      {/* Page Content */}
      <div className="container mt-5">
        <TemplatesComponent />
      </div>

      {/* Footer */}
      <Footer />

    </>
  );
};

export default Templates;
