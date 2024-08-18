import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {

  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const userImage = localStorage.getItem('userimage');
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user)
  const handleLogout = async() => {
      
      const res = await fetch('http://localhost:3001/api/logout', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'token' : localStorage.getItem('token'),
              'userid' : user._id,
          },
      });
      console.log('loggin out')
      const data = await res.json();
      console.log(data);
      if(data.success == true){
          console.log(data);
          localStorage.removeItem('token');
          localStorage.removeItem('userid');
          localStorage.removeItem('user');
          localStorage.removeItem('userimage');
          navigate('/');
      }else{
          console.log(data.message)
      }
      
  };

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
              <Link to="/" className="nav-link active">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Templates" className="nav-link">
                Template
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a
                className="nav-link disabled"
                href="#"
                tabIndex="-1"
                aria-disabled="true"
              >
                Disabled
              </a>
            </li>
          </ul>
          {/* <form className="d-flex"> */}
          <div className="d-flex align-items-center" style={{ width: "500px" }}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            {!token ? (
              <>
                <Link to="/signup" className="btn-outline-success me-2">Sign Up</Link>
                <Link to="/login" className="btn-outline-success">Login</Link>
              </>
            ) :
            (
              <>
                <button className="btn-outline-success me-2" onClick={handleLogout}>Logout</button>
                <img class="user-image" src={userImage}></img>
              </>
                    )}
          </div>

          {/* </form> */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
