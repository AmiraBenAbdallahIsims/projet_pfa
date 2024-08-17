import React from 'react';
import './signup';
import '../App.css';
import logo from '../assets/logilink.png'; // Ensure the path to the logo is correct
import { Link } from 'react-router-dom';


function Login() {
  return (
    <div className="login-container">
      <div className="login-left">
        <div className="logo">
          {/* Display the logo image */}
          <img src={logo} alt="Logo" />
        </div>
        <div className="form">
          <input type="text" placeholder="Username" className="input-field" />
          <input type="password" placeholder="Password" className="input-field" />
          <button className="large-btn">Login</button>
          <a href="#" className="forgot-password">Forgot Password?</a>
          <div className="signup-text">
            Don't have an account? 
            <Link to="/signup" className="small-btn">Create New</Link>
          </div>
        </div>
      </div>
      <div className="login-right">
        <div className="text-section">
          <h2>Your Promotional Text Here</h2>
          <p>Add a brief description or slogan here.</p>
        </div>
        <div className="image-section">
          {/* You can add an image here */}
          <img src="your-image-url" alt="Description" />
        </div>
      </div>
    </div>
  );
}

export default Login;
