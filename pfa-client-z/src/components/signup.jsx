import React from "react";
import "./login";
import "../App.css";
import logo from "../assets/logilink.png"; // Ensure the path to the logo is correct
import { Link } from "react-router-dom";

function signup() {
  return (
    <div className="login-container">
      <div className="signup-left">
        <div className="text-section">
          <h2>Your Promotional Text Here</h2>
          <p>Add a brief description or slogan here.</p>
        </div>
        <div className="image-section">
          {/* You can add an image here */}
          <img src="your-image-url" alt="Description" />
        </div>
      </div>
      <div className="signup-right">
        <div className="logo">
          {/* Display the logo image */}
          <img src={logo} alt="Logo" />
        </div>
        <div className="form">
          <input type="text" placeholder="Nom" className="input-field" />
          <input type="text" placeholder="Prénom" className="input-field" />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
          />
          <button className="large-btn">Sign Up</button>
          <a href="#" className="forgot-password">Forgot Password?</a>
          <div className="login-text">
            Already have an account?
            <Link to="/login" className="small-btn">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default signup;
