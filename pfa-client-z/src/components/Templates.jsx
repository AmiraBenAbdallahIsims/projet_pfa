import React from "react";
import "../App.css";

import Navbar from './navbar';
import Footer from './footer';
import ScrollImg from './scrollimg';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Templates = () => {
  return (
    <>
      <Navbar/>
       {/* Page Content */}
       <div className="container mt-5">
        {/* Big Title */}
        <h1 className="text-center mb-4 page-title">Big Title for the Template Page</h1>

        {/* Small Paragraph */}
        <p className="text-center mb-5">
          This is a small introductory paragraph explaining the content of this template page. It's concise and serves as a quick guide to the users.
        </p>

      {/* templates carousel */}
      <ScrollImg />
      </div>

      {/* Footer */}
      <Footer />
      
    </>
    );
};

export default Templates;
