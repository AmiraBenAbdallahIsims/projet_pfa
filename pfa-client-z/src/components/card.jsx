import React, { useState } from 'react';
import '../css/card.css';
import bg from '../assets/marbresearl.png';

import ChangeModal from './changemodal';
import ChangeText from './Change-text';

const Card = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({
    type : 0,
    title: '',
    content: ''
  });

  const [inputsState , setInputsState] = useState({
    facebookLink : '',
    facebookTitle : 'My facebook',
    instagramLink : '',
    instagramTitle : 'My Instagram',
  });
  

  const handleButtonClick = (pageNumber, title, content) => {
    setModalContent({ pageNumber,title, content });
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

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
        <h2 className="name">Tati Ferreira</h2>
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
        <button
          type="button"
          className="link-button"
          onClick={() => handleButtonClick(1 , '2024 Collection', 'Content for 2024 Collection')}
        >
          2024 Collection
        </button>
        <button
          type="button"
          className="link-button"
          onClick={() => handleButtonClick(2 , 'My Shop', 'Content for My Shop')}
        >
          My Shop
        </button>
        <button
          type="button"
          className="link-button"
          onClick={() => handleButtonClick(3 , inputsState.facebookTitle, 'Content for Facebook Page')}
        >
          {inputsState.facebookTitle}
        </button>
        <button
          type="button"
          className="link-button"
          onClick={() => handleButtonClick(4 , inputsState.instagramTitle, 'Content for Instagram')}
        >
          {inputsState.instagramTitle}
        </button>
      </div>

      {isModalVisible && (
        <ChangeModal
          title={modalContent.title}
          content={modalContent.content}
          typeNumber ={modalContent.pageNumber}
          onClose={handleCloseModal}
          setInputsState={setInputsState}
          inputsState = {inputsState}
        />
      )}
    </div>
  );
};

export default Card;
