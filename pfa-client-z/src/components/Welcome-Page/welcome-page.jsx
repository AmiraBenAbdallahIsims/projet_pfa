import React from "react";
import "../../App.css";

import Navbar from "../general-compo/navbar";
import Footer from "../general-compo/footer";
import Carousel from "./Components/carousel";
import Faq from "../general-compo/drop";

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
