import React from "react";
import "./GridLayout.css"; // Import the CSS file

const GridLayout = ({ items }) => {

  function getCardImage(card) {
      const cardDesign = JSON.parse(card.cardDesign);
      return cardDesign.profileImage;
  }

  const getCardName = (item)=>{
    const cardDesign = JSON.parse(item.cardDesign);
    return cardDesign.name.text;
  }

  return (
    <div className="grid-container">
      {items.map((item, index) => (
        <div key={index} className="grid-item">
          <div className="card">
            <div className="card-face card-front">
              <img className="item-grid" src={getCardImage(item)} alt={`Profile ${index + 1}`} />
            </div>
            <div className="card-face card-back">
              <img src={getCardImage(item)} alt="Link Up Logo" className="logo" />
              <a href={`/templates/${item.cardName}/${item._id}`} className="url-link card-url" target="_blank" rel="noopener noreferrer">
                <span><img class="linkup-logo" src="/static/media/logilink.eff46d26c8f630329615.png"/></span> / {getCardName(item)}
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridLayout;
