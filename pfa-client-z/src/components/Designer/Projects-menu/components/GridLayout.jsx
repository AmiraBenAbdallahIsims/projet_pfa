import React from "react";
import "./GridLayout.css"; // Import the CSS file

const GridLayout = ({ items }) => {
  return (
    <div className="grid-container">
      {items.map((item, index) => (
        <div key={index} className="grid-item">
          <div className="card">
            <div className="card-face card-front">
              <img src={item.profileImage} alt={`Profile ${index + 1}`} />
            </div>
            <div className="card-face card-back">
              <img src="/logo.png" alt="Link Up Logo" className="logo" />
              <a href={item.url} className="url-link" target="_blank" rel="noopener noreferrer">
                {item.url}
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridLayout;
