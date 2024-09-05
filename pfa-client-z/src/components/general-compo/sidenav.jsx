import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../../css/sideNav.css';

const SideNav = () => {
  const [activeItem, setActiveItem] = useState('Home');

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  return (
    <div className="side-nav d-flex flex-column flex-shrink-0">
      <div className="profile-section text-center py-4">
        <img src="https://github.com/mdo.png" alt="Profile" className="profile-pic rounded-circle" />
      </div>
      <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
        <li className="nav-item">
          <Link
            to="/projects"
            className={`nav-link py-3 ${activeItem === 'Projects' ? 'active-item' : ''}`}
            onClick={() => handleItemClick('Projects')}
          >
            <i className="bi bi-folder"></i>
            <span className="nav-label">Projects</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/TemplatesSide"
            className={`nav-link py-3 ${activeItem === 'Templates' ? 'active-item' : ''}`}
            onClick={() => handleItemClick('Templates')}
          >
            <i className="bi bi-folder2-open"></i>
            <span className="nav-label">Templates</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/feed"
            className={`nav-link py-3 ${activeItem === 'Feed' ? 'active-item' : ''}`}
            onClick={() => handleItemClick('Feed')}
          >
            <i className="bi bi-newspaper"></i>
            <span className="nav-label">Feed</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/Home"
            className={`nav-link py-3 ${activeItem === 'Statistics' ? 'active-item' : ''}`}
            onClick={() => handleItemClick('Statistics')}
          >
            <i className="bi bi-bar-chart"></i>
            <span className="nav-label">Statistics</span>
          </Link>
        </li>
      </ul>
      <div className="settings-section mt-auto text-center">
        <Link
          to="/settings"
          className={`nav-link py-3 ${activeItem === 'Settings' ? 'active-item' : ''}`}
          onClick={() => handleItemClick('Settings')}
        >
          <i className="bi bi-gear"></i>
          <span className="nav-label">Settings</span>
        </Link>
      </div>
    </div>
  );
};

export default SideNav;
