import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import Forgot from "./forgotpassword/forgotPassword";
import logo from '../../assets/logilink.png'; // Ensure the path to the logo is correct
import './login-signup.css';

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

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
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
      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('userimage', data.image);
        navigate('/WelcomeDesigner');
      } else {
        setErrors({ login: data.message || "Login failed. Please try again." });
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrors({ login: "An error occurred during login. Please try again." });
    }
  };

  const handleGoogleSuccess = async (response) => {
    const credentials = response.credential;

    try {
      const res = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'google': true
        },
        body: JSON.stringify({ credits: credentials }),
      });

      const data = await res.json();
      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userid', data.userid);
        localStorage.setItem('userimage', data.image);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/WelcomeDesigner');
      } else {
        setErrors({ login: data.message || "Google login failed. Please try again." });
      }
    } catch (error) {
      console.error("Error during Google login:", error);
      setErrors({ login: "An error occurred during Google login. Please try again." });
    }
  };

  const handleGoogleError = (error) => {
    console.error("Google login error:", error);
    setErrors({ login: "Google login failed. Please try again." });
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="form">
          <input
            type="email"
            placeholder="Username"
            className="input-field"
            onChange={handleEmailChange}
            value={email}
          />
          {errors.email && <div className="error">{errors.email}</div>}
          
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            onChange={handlePasswordChange}
            value={password}
          />
          {errors.password && <div className="error">{errors.password}</div>}

          <button className="large-btn" onClick={handleLogin}>Login</button>
          {errors.login && <div className="error">{errors.login}</div>}

          <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />

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
          <img src="your-image-url" alt="Description" />
        </div>
      </div>
      <Forgot show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
}

export default Login;
