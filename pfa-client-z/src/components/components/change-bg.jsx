import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ChangeBackgroundModal = ({ onClose, onSave }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    if (event.target.files.length > 0) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleSaveChanges = () => {
    if (onSave && typeof onSave === 'function') {
      onSave(selectedImage);
    } else {
      console.error("onSave is not a function");
    }
    onClose(); // Close modal after saving
  };

  return (
    <Modal.Body>
      <div className="modal-header">
        <h5 className="modal-title">Change Background</h5>
        <button
          type="button"
          className="btn-close"
          onClick={onClose}
          aria-label="Close"
        ></button>
      </div>
      <div className="modal-body">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {selectedImage && <img src={selectedImage} alt="Selected" style={{ width: '100%' }} />}
      </div>
      <div className="modal-footer">
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSaveChanges}>Save changes</Button>
      </div>
    </Modal.Body>
  );
};

export default ChangeBackgroundModal;
