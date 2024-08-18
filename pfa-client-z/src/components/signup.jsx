import React from "react";
import "./login";
import "../App.css";
import logo from "../assets/logilink.png"; // Ensure the path to the logo is correct
import { Link } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import { useState , useRef} from "react";
import { useNavigate } from 'react-router-dom';


function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [file , setFile] = useState({});
  const [fileName, setFileName] = useState('Choose File');
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

  async function fetchData() {
    try {
      console.log(file);
      const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('image', file);
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
          <input type="text" placeholder="Nom" className="input-field" value={username} onChange={handleUsernameChange} name="name" />
          <input type="text" placeholder="Email" className="input-field" onChange={handleEmailChange} name="email" />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            name="password"
            onChange={handlePasswordChange}

          />
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
          />
          <button className="large-btn" onClick={fetchData}>Sign Up</button>
          <GoogleLogin  onSuccess={handleGoogleSuccess}
                        onError={handleGoogleError}/>
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

export default Signup;
