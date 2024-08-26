import React from 'react';
import './signup';
import '../App.css';
import logo from '../assets/logilink.png'; // Ensure the path to the logo is correct
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import Forgot from "./forgotpassword/forgotPassword";


function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "A valid email address is required.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const token = localStorage.getItem('token'); // Bech tjib el token men localStorage
  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);

  };
  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);

  };
  const HandleLogin = async () => {
    if (!validateForm()) return;
    try {
      const res = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),

    });

      const data = await res.json();
      console.log(data);
      if (data.success == true) {
          localStorage.setItem('token', data.token); // Bech t7ot el token fl localStorage
          localStorage.setItem('user', JSON.stringify(data.user)); // Bech t7ot el id fl localStorage
          localStorage.setItem('userimage', data.image);
          console.log(localStorage.getItem('user'));
          navigate('/');
    } else {
          setErrors({ login: data.message || "Login failed. Please try again." });
    }
  } catch (error) {
      console.error("Error during login:", error);
      setErrors({ login: "An error occurred during login. Please try again." });
  }
  }

  const handleGoogleSuccess = async (response) => {
    const credits = response.credential;
    console.log(credits);

    const res = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'google' : true
        },
        body: JSON.stringify({ credits: credits }), 
    });
    const data = await res.json();
    if (data.success == true) {
        localStorage.setItem('token', data.token); // Bech t7ot el token fl localStorage
        localStorage.setItem('userid', data.userid); // Bech t7ot el id fl localStorage
        localStorage.setItem('userimage', data.image);
        localStorage.setItem('user', JSON.stringify(data.user)); // Bech t7ot el id fl localStorage
        navigate('/');
    }
  }

  const handleGoogleError = (error) => {
    console.error("Google login error:", error);
    setErrors({ login: "Google login failed. Please try again." });
  };


  return (
    <div className="login-container">
      <div className="login-left">
        <div className="logo">
          {/* Display the logo image */}
          <img src={logo} alt="Logo" />
        </div>
        <div className="form">
          <input type="email" placeholder="Username" className="input-field" onChange={handleEmailChange} name="email" />
          {errors.email && <div className="error">{errors.email}</div>}
          <input type="password" placeholder="Password" className="input-field" onChange={handlePasswordChange} name="password"/>
          {errors.password && <div className="error">{errors.password}</div>}
          <button className="large-btn" onClick={HandleLogin}>Login</button>
          {errors.login && <div className="error">{errors.login}</div>}
          <GoogleLogin   onSuccess={handleGoogleSuccess} onError={handleGoogleError}/>
          <a onClick={() => setModalShow(true)} className="forgot-password">Forgot Password?</a>
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
      <Forgot show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
}

export default Login;
