import React, { useState } from 'react';
import { Modal, Button, Nav, Tab, Form } from 'react-bootstrap';
import { FaBold, FaItalic, FaUnderline } from 'react-icons/fa';
import PropTypes from 'prop-types';

const ChangeModal = ({ element, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [fontColor, setFontColor] = useState('#000000');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [borderColor, setBorderColor] = useState('#000000');
  const [borderWidth, setBorderWidth] = useState('0px');
  const [hasBorder, setHasBorder] = useState(false);

  const validateTitle = (value) => {
    const regex = /^[A-Za-z0-9_ ]*$/;
    if (!regex.test(value)) {
      setTitleError("Title can only contain letters, numbers, and the character _");
      return false;
    } else {
      setTitleError("");
      return true;
    }
  };

  const handleTitleChange = (event) => {
    const value = event.target.value;
    setTitle(value);
    validateTitle(value);
  };

  const handleSaveChanges = () => {
    if (typeof onSave === 'function') {
      if (validateTitle(title)) {
        onSave({
          title,
          subtitle,
          fontColor,
          fontFamily,
          isBold,
          isItalic,
          isUnderline,
          borderColor,
          borderWidth,
          hasBorder
        });
        alert('Changes saved successfully!');
        onClose(); // Close modal after saving
      } else {
        alert('Please correct the title before saving.');
      }
    } else {
      console.error('onSave is not a function');
    }
  };

  const handleDeleteButton = () => {
    alert('Button deleted!');
    onClose(); // Close modal after deleting
  };

  return (
    <Modal.Body>
      <div className="modal-header">
        <h5 className="modal-title">Modify {element}</h5>
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
              <Nav.Link eventKey="action">Action</Nav.Link>
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

            <Tab.Pane eventKey="action">
              <h6 className="modal-subtitle">Action</h6>
              <Form.Group className="mb-3">
                <Form.Select id="selectAction" aria-label="Select Action">
                  <option value="website">Website</option>
                  <option value="facebook">Facebook</option>
                  <option value="instagram">Instagram</option>
                  <option value="other">Other</option>
                </Form.Select>
              </Form.Group>
              <h6 className="modal-subtitle">Link</h6>
              <Form.Control
                id="contentLink"
                rows="2"
                placeholder="Link"
              />
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
              <div className="mb-3">
                <label htmlFor="borderColor" className="form-label">Border Color</label>
                <input
                  type="color"
                  id="borderColor"
                  className="form-control"
                  value={borderColor}
                  onChange={(e) => setBorderColor(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="borderWidth" className="form-label">Border Width</label>
                <input
                  type="number"
                  id="borderWidth"
                  className="form-control"
                  value={borderWidth}
                  onChange={(e) => setBorderWidth(`${e.target.value}px`)}
                />
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  id="hasBorder"
                  className="form-check-input"
                  checked={hasBorder}
                  onChange={() => setHasBorder(!hasBorder)}
                />
                <label htmlFor="hasBorder" className="form-check-label">Add Border</label>
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

ChangeModal.propTypes = {
  element: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default ChangeModal;
