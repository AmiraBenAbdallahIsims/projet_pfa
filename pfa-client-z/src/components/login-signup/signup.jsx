import React, { useState } from "react";
import '../../App.css';
import logo from '../../assets/logilink.png';
import Forgot from "./forgotpassword/forgotPassword";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';

function Signup() {
  const [username, setUsername] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState(null);
  const [birthDate, setBirthDate] = useState('');
  const [place, setPlace] = useState('');
  const [sex, setSex] = useState('');
  const [errors, setErrors] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePrenomChange = (event) => setPrenom(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleFileChange = (event) => setFile(event.target.files[0]);
  const handleBirthDateChange = (event) => setBirthDate(event.target.value);
  const handlePlaceChange = (event) => setPlace(event.target.value);
  const handleSexChange = (event) => setSex(event.target.value);

  const validateForm = () => {
    const newErrors = {};
    if (!username || !/^[A-Za-z]+$/.test(username)) newErrors.username = "Valid username (letters only) is required.";
    if (!prenom || !/^[A-Za-z]+$/.test(prenom)) newErrors.prenom = "Valid prénom (letters only) is required.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "A valid email address is required.";
    if (!password) newErrors.password = "Password is required.";
    if (!birthDate) newErrors.birthDate = "Birth Date is required.";
    if (!place) newErrors.place = "Place of Residence is required.";
    if (!sex) newErrors.sex = "Sex is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('prenom', prenom);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('birthDate', birthDate);
      formData.append('place', place);
      formData.append('sex', sex);
      formData.append('image', file);

      const res = await fetch('http://localhost:3001/api/signup', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        console.error('Failed to fetch:', res.statusText);
        return;
      }

      const data = await res.json();
      console.log('Response data:', data);

      navigate('/WelcomeDesigner');
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const handleGoogleSuccess = async (response) => {
    const credits = response.credential;

    try {
      const res = await fetch('http://localhost:3001/api/googlesignup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credits }),
      });

      const data = await res.json();
      if (data.success) {
        navigate('/WelcomeDesigner');
      }
      console.log(data);
    } catch (error) {
      console.error('Google signup error:', error);
    }
  };

  const handleGoogleError = (err) => {
    console.log('Google login error:', err);
  };

  return (
    <div className="login-container">
      <div className="signup-left">
        <div className="text-section">
          <h2>Your Promotional Text Here</h2>
          <p>Add a brief description or slogan here.</p>
        </div>
        <div className="image-section">
          <img src="your-image-url" alt="Description" />
        </div>
      </div>
      <div className="signup-right">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="form">
          <div className="input-group">
            <div className="input-row">
              <input
                type="text"
                placeholder="Nom"
                className="input-field half-width"
                value={username}
                onChange={handleUsernameChange}
                pattern="[A-Za-z]+"
                required
              />
              <input
                type="text"
                placeholder="Prénom"
                className="input-field half-width"
                value={prenom}
                onChange={handlePrenomChange}
                pattern="[A-Za-z]+"
                required
              />
            </div>
            {errors.username && <p className="error">{errors.username}</p>}
            {errors.prenom && <p className="error">{errors.prenom}</p>}
          </div>
          
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              className="input-field"
              value={email}
              onChange={handleEmailChange}
              required
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          
          <div className="input-group">
            <div className="input-row">
              <input
                type="date"
                placeholder="Birth Date"
                className="input-field half-width"
                value={birthDate}
                onChange={handleBirthDateChange}
                required
              />
              <input
                type="text"
                placeholder="Place of Residence"
                className="input-field half-width"
                value={place}
                onChange={handlePlaceChange}
                required
              />
            </div>
            {errors.birthDate && <p className="error">{errors.birthDate}</p>}
            {errors.place && <p className="error">{errors.place}</p>}
          </div>
          <div className="input-group">
            <select
              className="input-field"
              value={sex}
              onChange={handleSexChange}
              required
            >
              <option value="">Select Sex</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.sex && <p className="error">{errors.sex}</p>}
          </div>
          <div className="input-group">
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
            />
          </div>
          <button className="large-btn" onClick={handleSubmit}>Sign Up</button>
          <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
          <a onClick={() => setModalShow(true)} className="forgot-password">Forgot Password?</a>
          <div className="login-text">
            Already have an account?
            <Link to="/login" className="small-btn">Login</Link>
          </div>
        </div>
      </div>
      <Forgot show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
}

export default Signup;
