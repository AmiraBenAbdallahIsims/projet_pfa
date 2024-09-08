import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios'; // For making the API request

const ChangeBackgroundModal = ({ onClose, onSave, setData, modalType }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  const handleImageChange = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
      uploadImage(file);  // Automatically upload the image upon selection
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    setIsUploading(true); // Set upload state

    try {
      const response = await fetch('http://localhost:3001/api/uploadimage', {
        method: 'POST',
        headers: {
          'token': token,
          'userid': JSON.parse(user)._id,
        },
        body: formData, // Include FormData in the request body
      });

      // Check if response is ok
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse JSON response
      const result = await response.json();
      const imageUrl = result.url;  // Backend should return the image URL

      if (onSave) {
        onSave(imageUrl);
        if (modalType === "1") {
          setData((prevData) => ({
            ...prevData,  // Preserve the previous state
            backgroundImage: imageUrl  // Update only the background image
          }));
        } else {
          setData((prevData) => ({
            ...prevData,  // Preserve the previous state
            profileImage: imageUrl  // Update only the profile image
          }));
        }
        

      }
    } catch (error) {
      console.error('Image upload failed:', error);
    } finally {
      setIsUploading(false); // Reset upload state
      onClose();  // Close modal once the image is uploaded
    }
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
        {previewImage && <img src={previewImage} alt="Selected" style={{ width: '100%' }} />}
        {isUploading && <p>Uploading...</p>}
      </div>
      <div className="modal-footer">
        <Button variant="secondary" onClick={onClose} disabled={isUploading}>Cancel</Button>
      </div>
    </Modal.Body>
  );
};

export default ChangeBackgroundModal;
