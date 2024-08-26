import React, { useState } from 'react';
import './card.css'; // Assuming you have a CSS file for styling
import bg from '../assets/marbresearl.png'; // Default background image
import profile from '../assets/marbresearl.png'; // Default profile image
import 'bootstrap-icons/font/bootstrap-icons.css';

import ChangeModal from './components/btn-change-modal.jsx';
import ChangeText from './components/Change-text.jsx';
import ChangeBackgroundModal from './components/change-bg.jsx';
import { Modal, Button } from 'react-bootstrap';

const Card = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [activeElement, setActiveElement] = useState(null);
  const [show, setShow] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(bg);
  const [profileImage, setProfileImage] = useState(profile);
  const [name, setName] = useState({ text: "Tati Ferreira", style: {} });
  const [title, setTitle] = useState({ text: "Fashion Designer", style: {} });
  const [titleOrName, setTitleOrName] = useState('');
  const [buttons, setButtons] = useState([
    { title: '2024 Collection', subtitle: 'Explore Now', link: '#', style: {}, action: '' },
    { title: 'My Shop', subtitle: 'Shop Now', link: '#', style: {}, action: '' },
    { title: 'My Facebook Page', subtitle: 'Connect on Facebook', link: '#', style: {}, action: 'facebook' },
    { title: 'My Instagram', subtitle: 'Follow on Instagram', link: '#', style: {}, action: 'instagram' }
  ]);

  const handleOpenModal = (modalType, element) => {
    setActiveModal(modalType);
    setActiveElement(element);
    setShow(true);

    if (element === 'name') {
      setTitleOrName(name.text);
    } else if (element === 'title') {
      setTitleOrName(title.text);
    }
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

  const handleSaveText = (updatedText) => {
    if (activeElement === 'name') {
      setName(updatedText);
    } else if (activeElement === 'title') {
      setTitle(updatedText);
    }
    handleCloseModal();
  };

  const handleDeleteText = () => {
    if (activeElement === 'name') {
      setName({ text: '', style: {} });
    } else if (activeElement === 'title') {
      setTitle({ text: '', style: {} });
    }
    handleCloseModal();
  };

  const handleSaveButton = (updatedButton) => {
    if (activeElement === null) {
      // Add new button
      setButtons([...buttons, updatedButton]);
    } else {
      // Update existing button
      const newButtons = [...buttons];
      newButtons[activeElement] = updatedButton;
      setButtons(newButtons);
    }
    handleCloseModal();
  };

  const handleDeleteButton = (buttonToDelete) => {
    const newButtons = buttons.filter((button) => button !== buttonToDelete);
    setButtons(newButtons);
    handleCloseModal();
  };

  const handleAddNewButton = () => {
    handleOpenModal('modal', null); // Open modal for adding a new button
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
          style={name.style}
          onClick={() => handleOpenModal('text', 'name')}
        >
          {name.text}
        </h2>
        <p
          className="title"
          style={title.style}
          onClick={() => handleOpenModal('text', 'title')}
        >
          {title.text}
        </p>
      </div>
      <div className="menu-section">
        <button className="menu-button active">V.Card</button>
        <button className="menu-button">Catalogue</button>
        <div className="menu-icons">
          <i className="bi bi-chat"></i>
          <i className="bi bi-star"></i>
          <i className="bi bi-three-dots-vertical"></i>
        </div>
      </div>
      <div className="links-section">
        {buttons.map((button, index) => (
          <button
            key={index}
            type="button"
            className="link-button"
            style={button.style}
            onClick={() => handleOpenModal('modal', index)}
          >
            {button.title}
          </button>
        ))}
        <button
          type="button"
          className="link-button add-button"
          onClick={handleAddNewButton}
        >
          +
        </button>
      </div>

      {/* Modal Rendering */}
      <Modal show={show} onHide={handleCloseModal} centered>
        {activeModal === 'modal' && (
          <ChangeModal
            button={activeElement !== null ? buttons[activeElement] : {}}
            onSave={handleSaveButton}
            onClose={handleCloseModal}
            handleDeleteButton={handleDeleteButton} // Pass delete handler to modal
          />
        )}
        {activeModal === 'text' && (
          <ChangeText
            content={titleOrName}
            element={activeElement}
            onClose={handleCloseModal}
            onSave={handleSaveText}
            onDelete={handleDeleteText} // Pass delete handler for text
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
