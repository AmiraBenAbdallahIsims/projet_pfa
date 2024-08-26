import React, { useState } from 'react';
import { Modal, Button, Nav, Tab, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FaBold, FaItalic, FaUnderline } from 'react-icons/fa';

const ChangeModal = ({ button = {}, onClose, onSave, handleDeleteButton }) => {
  const [title, setTitle] = useState(button.title || '');
  const [subtitle, setSubtitle] = useState(button.subtitle || '');
  const [link, setLink] = useState(button.link || '');
  const [fontColor, setFontColor] = useState(button.style?.color || '#000000');
  const [backgroundColor, setBackgroundColor] = useState(button.style?.backgroundColor || '#ffffff');
  const [borderColor, setBorderColor] = useState(button.style?.borderColor || '#000000');
  const [borderWidth, setBorderWidth] = useState(button.style?.borderWidth || '0px');
  const [fontWeight, setFontWeight] = useState(button.style?.fontWeight || 'normal');
  const [fontStyle, setFontStyle] = useState(button.style?.fontStyle || 'normal');
  const [borderStyle, setBorderStyle] = useState(button.style?.borderStyle || 'none');
  const [isBold, setIsBold] = useState(button.style?.fontWeight === 'bold');
  const [isItalic, setIsItalic] = useState(button.style?.fontStyle === 'italic');
  const [isUnderline, setIsUnderline] = useState(button.style?.textDecoration === 'underline');
  const [action, setAction] = useState(button.action || '');

  const handleSaveChanges = () => {
    let borderWidthInt = parseInt(borderWidth, 10);
    let finalBorderStyle = borderWidthInt > 0 ? 'solid' : 'none';
    onSave({
      title,
      subtitle,
      link,
      style: {
        color: fontColor,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: borderWidth,
        fontWeight: isBold ? 'bold' : 'normal',
        fontStyle: isItalic ? 'italic' : 'normal',
        textDecoration: isUnderline ? 'underline' : 'none',
        borderStyle: finalBorderStyle
      },
      action
    });
  };

  return (
    <Modal.Body>
      <div className="modal-header">
        <h5 className="modal-title">Edit Button</h5>
        <button
          type="button"
          className="btn-close"
          onClick={onClose}
          aria-label="Close"
        ></button>
      </div>

      <div className="modal-body">
        <Tab.Container defaultActiveKey="content">
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
              <h6>Title</h6>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <h6>Subtitle</h6>
              <Form.Control
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
              />
            </Tab.Pane>
            <Tab.Pane eventKey="action">
              <h6>Action</h6>
              <Form.Control
                as="select"
                value={action}
                onChange={(e) => setAction(e.target.value)}
              >
                <option value="">Choose</option>
                <option value="facebook">Facebook</option>
                <option value="instagram">Instagram</option>
                <option value="other">Other</option>
              </Form.Control>

              <h6>Link</h6>
              <Form.Control
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </Tab.Pane>
            <Tab.Pane eventKey="design">
              <h6>Font Color</h6>
              <Form.Control
                type="color"
                value={fontColor}
                onChange={(e) => setFontColor(e.target.value)}
              />

              <h6>Background Color</h6>
              <Form.Control
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
              />

              <h6>Border Color</h6>
              <Form.Control
                type="color"
                value={borderColor}
                onChange={(e) => setBorderColor(e.target.value)}
              />

              <h6>Border Width</h6>
              <Form.Control
                type="text"
                value={borderWidth}
                onChange={(e) => setBorderWidth(e.target.value)}
              />

              <h6>Font Style</h6>
              <div className="font-style-buttons">
                <Button
                  variant={isBold ? 'primary' : 'light'}
                  onClick={() => setIsBold(!isBold)}
                >
                  <FaBold />
                </Button>
                <Button
                  variant={isItalic ? 'primary' : 'light'}
                  onClick={() => setIsItalic(!isItalic)}
                >
                  <FaItalic />
                </Button>
                <Button
                  variant={isUnderline ? 'primary' : 'light'}
                  onClick={() => setIsUnderline(!isUnderline)}
                >
                  <FaUnderline />
                </Button>
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>

      <div className="modal-footer">
        {button.title && (
          <Button variant="danger" onClick={() => handleDeleteButton(button)}>
            Delete Button
          </Button>
        )}
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </div>
    </Modal.Body>
  );
};

ChangeModal.propTypes = {
  button: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func
};

export default ChangeModal;
