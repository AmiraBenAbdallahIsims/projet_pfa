import React, { useState } from 'react';
import { Modal, Button, Nav, Tab } from 'react-bootstrap';
import { FaBold, FaItalic, FaUnderline } from 'react-icons/fa';

const ChangeText = ({ element, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [fontColor, setFontColor] = useState('#000000');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const validateTitle = (value) => {
    const regex = /^[A-Za-z0-9_ ]*$/;
    return regex.test(value);
  };

  const handleTitleChange = (event) => {
    const value = event.target.value;
    setTitle(value);
    if (!validateTitle(value)) {
      setTitleError("Title can only contain letters, numbers, and the character _");
    } else {
      setTitleError("");
    }
  };

  const handleSaveChanges = () => {
    if (validateTitle(title)) {
      if (onSave && typeof onSave === 'function') {
        onSave({ title, subtitle, fontColor, fontFamily, isBold, isItalic, isUnderline });
      } else {
        console.error("onSave is not a function");
      }
      onClose(); // Close modal after saving
    } else {
      alert('Please correct the title before saving.');
    }
  };

  const handleDeleteButton = () => {
    alert("Text deleted!");
    onClose(); // Close modal after deleting
  };

  return (
    <Modal.Body>
      <div className="modal-header">
        <h5 className="modal-title">
          Modify {element}
        </h5>
        <button
          type="button"
          className="btn-close"
          onClick={onClose}
          aria-label="Close"
        ></button>
      </div>
      <div className="modal-body">
        <Tab.Container id="left-tabs-example" defaultActiveKey="content">
          <Nav variant="tabs">
            <Nav.Item>
              <Nav.Link eventKey="content">Content</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="design">Design</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="content">
              <h6 className="modal-subtitle">Link text</h6>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="Title"
                  required
                  pattern="^[A-Za-z0-9_ ]*$"
                />
                {titleError && <small className="text-danger">{titleError}</small>}
              </div>
              <div className="mb-3">
                <input
                  className="form-control"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  rows="2"
                  placeholder="Subtitle"
                />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="design">
              <p className="modal-subtitle">Text Style</p>
              <div className="text-style-options">
                <button
                  type="button"
                  className={`btn-style ${isBold ? 'active' : ''}`}
                  onClick={() => setIsBold(!isBold)}
                >
                  <FaBold />
                </button>
                <button
                  type="button"
                  className={`btn-style ${isItalic ? 'active' : ''}`}
                  onClick={() => setIsItalic(!isItalic)}
                >
                  <FaItalic />
                </button>
                <button
                  type="button"
                  className={`btn-style ${isUnderline ? 'active' : ''}`}
                  onClick={() => setIsUnderline(!isUnderline)}
                >
                  <FaUnderline />
                </button>
              </div>
              <div className="mb-3">
                <label htmlFor="fontColor" className="form-label">Font Color</label>
                <input
                  type="color"
                  id="fontColor"
                  className="form-control"
                  value={fontColor}
                  onChange={(e) => setFontColor(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="fontFamily" className="form-label">Font Family</label>
                <select
                  id="fontFamily"
                  className="form-select"
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                >
                  <option value="Arial">Arial</option>
                  <option value="Courier New">Courier New</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Verdana">Verdana</option>
                </select>
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
      <div className="modal-footer">
        <Button variant="danger" onClick={handleDeleteButton}>
          <i className="bi bi-trash"></i> Delete
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          Save changes
        </Button>
      </div>
    </Modal.Body>
  );
};

export default ChangeText;
