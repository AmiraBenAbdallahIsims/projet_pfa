import React, { useEffect, useState } from "react";
import '../css/modal.css';

const ChangeModal = ({ setInputsState, inputsState, typeNumber, title, onClose }) => {
  const [activeTab, setActiveTab] = useState('content'); // Set default tab as 'content'
  const [currentModal, setCurrentModal] = useState({
    link: '',
    title: '',
  });

  const [modalTitle, setModalTitle] = useState('');
  const [link , setLink] = useState('');
  useEffect(() => {
    switch (typeNumber) {
      case 1:
        console.log('1');
        break;
      case 2:
        console.log('2');
        break;
      case 3:
        setCurrentModal({
          link: inputsState.facebookLink,
          title: inputsState.facebookTitle
        });
        break;
      case 4:
        setCurrentModal({
          link: inputsState.instagramLink,
          title: inputsState.instagramTitle
        });
        break;
      default:
        console.log('Template Not Found');
    }
  }, [typeNumber, inputsState]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  
  const handleTitleChnge = (evt) =>{
    setModalTitle(evt.target.value);
  }
  
  const handleLinkChange = (evt) =>{
    setLink(evt.target.value);
  }

  const handleSaveClick = () =>{
    if(typeNumber == 3){
        
        setInputsState({
            facebookLink : link,
            facebookTitle : modalTitle,
            instagramLink : inputsState.instagramLink,
            instagramTitle : inputsState.instagramTitle,
        })
        console.log('wawaawa' , inputsState)
        
    }else if(typeNumber == 4){
        
        setInputsState({
            facebookLink : inputsState.facebookLink,
            facebookTitle : inputsState.facebookTitle,
            instagramLink : link,
            instagramTitle : modalTitle,
        });
        console.log('wawaawa' , inputsState)
    }
  }
  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <div className="custom-modal-header">
          <h5>{currentModal.title}</h5>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="custom-modal-body">
          <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <button
                className={`nav-link ${activeTab === 'content' ? 'active' : ''}`}
                onClick={() => handleTabClick('content')}
                type="button"
                role="tab"
              >
                Content
              </button>
              <button
                className={`nav-link ${activeTab === 'action' ? 'active' : ''}`}
                onClick={() => handleTabClick('action')}
                type="button"
                role="tab"
              >
                Action
              </button>
              <button
                className={`nav-link ${activeTab === 'design' ? 'active' : ''}`}
                onClick={() => handleTabClick('design')}
                type="button"
                role="tab"
              >
                Design
              </button>
            </div>
          </nav>

          <div className="tab-content" id="nav-tabContent">
            <div
              className={`tab-pane fade ${activeTab === 'content' ? 'show active' : ''}`}
              id="nav-content"
              role="tabpanel"
            >
              <h6 className="modal-subtitle">Link text</h6>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="contentTitle"
                  placeholder={currentModal.title}
                  required
                  pattern="^[A-Za-z0-9_ ]*$"
                  onChange={handleTitleChnge}
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-control"
                  id="contentSubtitle"
                  rows="2"
                  placeholder="Subtitle"
                />
              </div>
            </div>

            <div
              className={`tab-pane fade ${activeTab === 'action' ? 'show active' : ''}`}
              id="nav-action"
              role="tabpanel"
            >
              <h6 className="modal-subtitle">Action</h6>
              <div className="mb-3">
                <select
                  className="form-select"
                  id="selectAction"
                  aria-label="Select Action"
                >
                  <option value="website">Website</option>
                  <option value="facebook">Facebook</option>
                  <option value="instagram">Instagram</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <h6 className="modal-subtitle">Link</h6>
              <input
                className="form-control"
                id="contentLink"
                rows="2"
                placeholder={currentModal.link}
                onChange = {handleLinkChange}
              />
            </div>

            <div
              className={`tab-pane fade ${activeTab === 'design' ? 'show active' : ''}`}
              id="nav-design"
              role="tabpanel"
            >
              <p>This is the Design tab content.</p>
            </div>
          </div>
        </div>
        <div className="custom-modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSaveClick}
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeModal;
