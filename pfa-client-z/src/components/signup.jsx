import React from "react";
import "./login";
import '../css/login-signup.css';
import logo from "../assets/logilink.png"; // Ensure the path to the logo is correct
import { Link } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import { useState , useRef} from "react";
import { useNavigate } from 'react-router-dom';


function Signup() {
  const [username, setUsername] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [file , setFile] = useState({});
  const [fileName, setFileName] = useState('Choose File');
  const [birthDate, setBirthDate] = useState('');
  const [place, setPlace] = useState('');
  const [sex, setSex] = useState('');
  const [errors, setErrors] = useState({});
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

  const navigate = useNavigate();
  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);

  };
  const handleFileChange = (event) => {
    setFileName(event.target.files[0].name);
    setFile(event.target.files[0]);
};

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleBirthDateChange = (event) =>{ 
      setBirthDate(event.target.value);
  };
  
  const handlePlaceChange = (event) =>{
     setPlace(event.target.value);
  };  
  const handleSexChange = (event) =>{
     setSex(event.target.value);
  };   
  const handlePrenomChange = (event) =>{
    setPrenom(event.target.value);
 };   
  async function fetchData() {
    if (!validateForm()) return;
    try {
      console.log(file);
      const formData = new FormData();
        formData.append('username', username);
        formData.append('prenom', prenom);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('image', file);
        formData.append('birthDate', birthDate);
        formData.append('place', place);
        formData.append('sex', sex);
      const res = await fetch('http://localhost:3001/api/signup', {
        method: 'POST',
        body: formData
      });
      
      if (!res.ok) {
        console.error('Failed to fetch:', res.statusText);
        return;
      }

      const data = await res.json();
      console.log('Response data:', data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  const handleGoogleSuccess = async (response) => {
    
    const credits = response.credential;
    console.log(credits);

    const res = await fetch('http://localhost:3001/api/googlesignup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credits: credits }), // Convert object to JSON string
    });

    const data = await res.json();
    if(data.success == true){
        navigate('/login')
    }
    console.log(data)
    
  }


  const handleGoogleError = async(err) =>{
    console.log(err);
}


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
        <button className="large-btn" onClick={fetchData}>Sign Up</button>
        <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
        <div className="login-text">
          Already have an account?
          <Link to="/login" className="small-btn">Login</Link>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Signup;
