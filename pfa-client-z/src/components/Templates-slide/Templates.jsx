import React from "react";
import "../../App.css";

import Navbar from '../general-compo/navbar';
import Footer from '../general-compo/footer';
import SlideDiv from "./slide/slide-div"

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Templates = () => {

  const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    let isUser = false;
    if(token && user){
        isUser = token === user.token;
    }

  return (
    <>
      <Navbar/>
       {/* Page Content */}
       <div className="container mt-5">
        {/* Big Title */}
        <h1 className="text-center mb-4 page-title"> Hi {isUser ? user.username : " There"}</h1>

        {/* Small Paragraph */}
        <p className="text-center mb-5">
          This is a small introductory paragraph explaining the content of this template page. It's concise and serves as a quick guide to the users.
        </p>

      {/* templates carousel */}
      <SlideDiv  />
      </div>

      {/* Footer */}
      <Footer />
      
    </>
    );
};

export default Templates;
