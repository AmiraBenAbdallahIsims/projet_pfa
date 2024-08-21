import React, { useState } from 'react';
import '../v.card/card.css'; // Assuming you have a CSS file for styling
import bg from '../../assets/marbresearl.png'; // Default background image
import profile from '../../assets/marbresearl.png'; // Default profile image

import ChangeModal from './components/btn-change-modal.jsx';
import ChangeText from './components/Change-text.jsx';
import ChangeBackgroundModal from './components/change-bg.jsx';
import { Modal } from 'react-bootstrap';

const Card = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [activeElement, setActiveElement] = useState(null);
  const [show, setShow] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(bg);
  const [profileImage, setProfileImage] = useState(profile);

  const handleOpenModal = (modalType, element) => {
    setActiveModal(modalType);
    setActiveElement(element);
    setShow(true);
  };

  const handleCloseModal = () => {
    setShow(false);
    setActiveModal(null);
    setActiveElement(null);
  };

  const handleBackgroundChange = (newImage) => {
    setBackgroundImage(newImage);
  };

  const handleProfileChange = (newImage) => {
    setProfileImage(newImage);
  };

  const handleTextChanges = (textProperties) => {
    // Handle text changes such as updating state or making API calls
    console.log('Text changes:', textProperties);
  };

  return (
    <div className="card-container">
      <div className="profile-section">
        <div
          className="background-image"
          style={{ backgroundImage: `url(${backgroundImage})` }}
          onClick={() => handleOpenModal('background', null)} // Open background modal
        >
          <img src={backgroundImage} alt="Background" className="background" />
        </div>

        <div className="profile-image" onClick={() => handleOpenModal('profile', null)}>
          <img src={profileImage} alt="Profile" className="profile-pic" />
          <div className="verified-badge"></div>
        </div>
        <h2
          className="name"
          onClick={() => handleOpenModal('text', 'name')}
        >
          Tati Ferreira
        </h2>
        <p
          className="title"
          onClick={() => handleOpenModal('text', 'title')}
        >
          Fashion Designer
        </p>
      </div>
      <div className="menu-section">
        <button className="menu-button active">V.Card</button>
        <button className="menu-button">Catalogue</button>
        <div className="menu-icons">
          <i className="bi bi-chat"></i> {/* Bootstrap chat icon */}
          <i className="bi bi-star"></i> {/* Bootstrap star icon */}
          <i className="bi bi-three-dots-vertical"></i> {/* Bootstrap more icon */}
        </div>
      </div>
      <div className="links-section">
        <button
          type="button"
          className="link-button"
          onClick={() => handleOpenModal('modal', '2024 Collection')}
        >
          2024 Collection
        </button>
        <button
          type="button"
          className="link-button"
          onClick={() => handleOpenModal('modal', 'My Shop')}
        >
          My Shop
        </button>
        <button
          type="button"
          className="link-button"
          onClick={() => handleOpenModal('modal', 'My Facebook Page')}
        >
          My Facebook Page
        </button>
        <button
          type="button"
          className="link-button"
          onClick={() => handleOpenModal('modal', 'My Instagram')}
        >
          My Instagram
        </button>
      </div>

      {/* Modal Rendering */}
      <Modal show={show} onHide={handleCloseModal} centered>
        {activeModal === 'modal' && (
          <ChangeModal 
            element={activeElement} 
            onClose={handleCloseModal} 
          />
        )}
        {activeModal === 'text' && (
          <ChangeText 
            element={activeElement} 
            onClose={handleCloseModal} 
            onSave={handleTextChanges} // Pass the onSave function
          />
        )}
        {activeModal === 'background' && (
          <ChangeBackgroundModal
            onClose={handleCloseModal}
            onSave={handleBackgroundChange}
          />
        )}
        {activeModal === 'profile' && (
          <ChangeBackgroundModal
            onClose={handleCloseModal}
            onSave={handleProfileChange}
          />
        )}
      </Modal>
    </div>
  );
};

export default Card;
