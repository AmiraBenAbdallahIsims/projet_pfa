import React from 'react';
import '../css/card.css'; // Assuming you have a CSS file for styling
import bg from '../assets/marbresearl.png';

import ChangeModal from './btn-change-modal';
import ChangeText from './Change-text';

const Card = () => {
  return (
    <div className="card-container">
      <div className="profile-section">
        <div className="background-image">
          <img
            src={bg}
            alt="Background"
            className="background"
          />
        </div>
        <div className="profile-image">
          <img
            src={bg}
            alt="Profile"
            className="profile-pic"
          />
          <div className="verified-badge"></div>
        </div>
        <h2 className="name" data-bs-toggle="modal" data-bs-target="#staticBackdrop" >Tati Ferreira</h2>
        <ChangeText />
        <p className="title">Fashion Designer</p>
      </div>
      <div className="menu-section">
        <button className="menu-button active">V.Card</button>
        <button className="menu-button">Catalogue</button>
        <div className="menu-icons">
          <i className="chat-icon">💬</i>
          <i className="favorite-icon">⭐</i>
          <i className="more-icon">⋮</i>
        </div>
      </div>
      <div className="links-section">
      {/* Button trigger modal */}
      <button type="button" className="link-button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  2024 Collection
</button>
<button type="button" className="link-button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
My Shop
</button>
<button type="button" className="link-button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
My Facebook Page
</button>
<button type="button" className="link-button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
My Instagram
</button>    
<ChangeModal />
      </div>
    </div>
  );
};

export default Card;
