import React, { useState } from 'react';
import { Modal, Button, Nav, Tab } from 'react-bootstrap';
import { FaBold, FaItalic, FaUnderline } from 'react-icons/fa';

const ChangeText = ({ content , element, onClose, onSave, onDelete }) => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [fontColor, setFontColor] = useState('#000000');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  // Initialize form with existing title and style
  React.useEffect(() => {
    console.log(element)
    setTitle(content);
  }, [element]);

  const validateTitle = (value) => {
    const regex = /^[A-Za-z0-9_ ]*$/;
    return regex.test(value);
  };

  const handleTitleChange = (event) => {
    const value = event.target.value;
    setTitle(value);
    if (!validateTitle(value)) {
      setTitleError("Title can only contain letters, numbers, and underscores");
    } else {
      setTitleError("");
    }
  };

  const handleSaveChanges = () => {
    if (validateTitle(title)) {
      // Construct the style object
      const style = {
        color: fontColor,
        fontFamily,
        fontWeight: isBold ? 'bold' : 'normal',
        fontStyle: isItalic ? 'italic' : 'normal',
        textDecoration: isUnderline ? 'underline' : 'none'
      };

      // Call the onSave function with updated title and style
      onSave({
        text: title,
        style
      });
    } else {
      alert('Please correct the title before saving.');
    }
  };

  const handleDeleteText = () => {
    onDelete();
  };

  return (
    <Modal.Body>
      <div className="modal-header">
        <h5 className="modal-title">
          Modify {element === 'name' ? 'Name' : 'Title'}
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
              <Nav.Link eventKey="styles">Styles</Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            <Tab.Pane eventKey="content">
              <div className="form-group">
                <label htmlFor="title">Text</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder={title}
                  value={title}
                  onChange={handleTitleChange}
                />
                {titleError && <div className="text-danger">{titleError}</div>}
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="styles">
              <div className="form-group">
                <label htmlFor="fontColor">Font Color</label>
                <input
                  type="color"
                  className="form-control"
                  id="fontColor"
                  value={fontColor}
                  onChange={(e) => setFontColor(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="fontFamily">Font Family</label>
                <select
                  className="form-control"
                  id="fontFamily"
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                >
                  <option value="Arial">Arial</option>
                  <option value="Courier New">Courier New</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Tahoma">Tahoma</option>
                  <option value="Times New Roman">Times New Roman</option>
                </select>
              </div>
              <div className="form-group">
                <label>Font Style</label>
                <div className="d-flex align-items-center">
                  <Button variant={isBold ? 'primary' : 'light'} onClick={() => setIsBold(!isBold)}>
                    <FaBold />
                  </Button>
                  <Button variant={isItalic ? 'primary' : 'light'} onClick={() => setIsItalic(!isItalic)}>
                    <FaItalic />
                  </Button>
                  <Button variant={isUnderline ? 'primary' : 'light'} onClick={() => setIsUnderline(!isUnderline)}>
                    <FaUnderline />
                  </Button>
                </div>
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
      <div className="modal-footer">
        <Button variant="danger" onClick={handleDeleteText}>
          Delete
        </Button>
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

export default ChangeText;
