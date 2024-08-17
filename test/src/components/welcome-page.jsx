import React from "react";
import "../App.css";

import Navbar from "./navbar";
import Footer from "./footer";
import Carousel from "./carousel";
import Faq from "./drop";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const WelcomePage = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      <div className="welcome-content">
        {/* Bootstrap Carousel */}
        <Carousel />

        {/* Bootstrap FAQ */}
        <Faq />

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default WelcomePage;
