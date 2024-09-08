import React, { useState, useEffect, useRef } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Select from 'react-select';
import PropTypes from "prop-types";
import { FaExternalLinkAlt, FaDownload, FaShareAlt, FaQrcode, FaUserCircle } from 'react-icons/fa'; // Import icons
import axios from 'axios';
import QRCode from "react-qr-code";
import { saveAs } from 'file-saver'; // Make sure to install this package
import { toPng, toSvg } from 'html-to-image'; // Make sure to install this package

import SideNav from "../../general-compo/sidenav";
import Card from "../../v.card/card";
import "./modif-card.css";
import { json, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";



const ModifCard = ({ cardData, onSave, templateName }) => {
  const [modified, setModified] = useState(false);
  const [showCreateButton, setShowCreateButton] = useState(true);
  const [showUpdateButton, setShowUpdateButton] = useState(false);
  const [showShareButton, setShowShareButton] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false); // For the Create button modal
  const [showShareModal, setShowShareModal] = useState(false); // For the Share button modal
  const [shareContent, setShareContent] = useState("menu"); // Control Share modal content
  const [clientsOptions, setClientsOptions] = useState([]);
  const [copyButtonText, setCopyButtonText] = useState("Copy"); // State for copy button text
  const [link, setLink] = useState("");
  const inputRef = useRef(null);
  const [data, setData] = useState({});
  const [selectedClient, setSelectedClient] = useState(null);
  const navigate = useNavigate();
  const [isTemplateCreated, setIsTemplateCreated] = useState(false);
  const [templateNameC, setTemplateNameC] = useState();
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const [createdCard, setCreatedCard] = useState('null')
  const { templateCardName, templateId } = useParams();




  useEffect(() => {
    setModified(true);
  }, [cardData]);


  useEffect(() => {
    const CheckTemplate = async () => {
      if (templateId) {
        const response = await fetch(`http://localhost:3001/api/checktemplate/${templateId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'token': token,
            'userid': JSON.parse(user)._id,
            'templateid': templateId
          },
        });


        const data = await response.json();
        if (data.success) {
          setIsTemplateCreated(true);
          setTemplateNameC(templateCardName);
          setShowCreateButton(false);
          setShowUpdateButton(true);
          await setCreatedCard(data.card);
          let generatedLink = `http://localhost:3000/templates/${templateCardName}/${templateId}/show`;
          setLink(generatedLink);
        } 
      }else {
        setTemplateNameC(templateName);
        setShowShareButton(false);
      }
    }

    CheckTemplate();
  }, [templateNameC, isTemplateCreated])

  useEffect(() => {

    const fetchClients = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/clients', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'token': token,
            'userid': JSON.parse(user)._id
          },
        });
        const data = await response.json();
        const clients = data.clients;
        const options = clients.map(client => ({
          value: client._id,
          label: client.username
        }));
        setClientsOptions(options);

      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };
    fetchClients();
  }, []);

  const handleClientChange = (selectedOption) => {
    setSelectedClient(selectedOption);
  };

  const handleCreate = () => {
    if (typeof onSave === 'function') {
      onSave();
    } else {
      console.error('onSave is not a function');
    }
    setShowCreateModal(true); 
  };

  const handleUpdate = () => {
    if (typeof onSave === 'function') {
      onSave();
    } else {
      console.error('onSave is not a function');
    }
  };

  const handleUpdateCard = async()=>{
    const userData = JSON.parse(user);
    const dataString = JSON.stringify(data);
    console.log(token)
    if (token) {
      const res = await fetch(`http://localhost:3001/api/updatecard/${templateId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'google': false,
          'token': token,
          'userid': userData._id,
          'templateid' : templateId
        },
        body: JSON.stringify({ templateName: templateCardName, data: dataString }),
      });

      const data = await res.json();
      if (data.success) {
        navigate(`/templates/${templateCardName}/${data.card._id}`);
      } else {
        console.error('Thamma error');
      }

    } else {
      console.error('User is not logged in');
    }
  }

  const handleCloseCreateModal = async () => {
    const userData = JSON.parse(user);
    const dataString = JSON.stringify(data);
    if (token) {
      const res = await fetch('http://localhost:3001/api/createcard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'google': true,
          'token': token,
          'userid': userData._id
        },
        body: JSON.stringify({ templateName: templateName, data: dataString, client: selectedClient }),
      });

      const data = await res.json();
      if (data.success) {
        setShowCreateModal(false);
        navigate(`/templates/${templateName}/${data.card._id}`);
      } else {
        console.error('Thamma error');
      }

    } else {
      console.error('User is not logged in');
    }
  }

  const closeModal = () => {
    setShowCreateModal(false);
  }

  const handleCloseShareModal = () => {
    setShowShareModal(false); // Close Share modal
    setShareContent("menu"); // Reset content on close
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(link); // Copy link to clipboard
    setCopyButtonText("Copied"); // Change button text to "Copied"
    setTimeout(() => setCopyButtonText("Copy"), 2000); // Reset button text after 2 seconds
  };


  const downloadQRCode = (format) => {
    const qrCodeElement = document.querySelector('.qr-code-wrapper > svg'); // Select the SVG element generated by react-qr-code

    if (!qrCodeElement) {
      console.error('QR code element not found');
      return;
    }

    if (format === 'png') {
      toPng(qrCodeElement)
        .then((dataUrl) => {
          saveAs(dataUrl, 'qr-code.png');
        })
        .catch((err) => {
          console.error('Error generating PNG:', err);
        });
    } else if (format === 'svg') {
      toSvg(qrCodeElement)
        .then((dataUrl) => {
          saveAs(new Blob([dataUrl], { type: 'image/svg+xml' }), 'qr-code.svg');
        })
        .catch((err) => {
          console.error('Error generating SVG:', err);
        });
    }
  };



  const renderShareModalContent = () => {
    switch (shareContent) {
      case "menu":
        return (
          <div>
            <h2>Share your Card</h2>
            <p>Get more visitors by sharing your card everywhere.</p>
            <ul>
              <li onClick={() => setShareContent("social")}>
                <FaShareAlt className="icon" />
                <span>Add to your socials</span>
                <FaExternalLinkAlt className="arrow-icon" />
              </li>
              <li onClick={() => setShareContent("qr")}>
                <FaQrcode className="icon" />
                <span>My Card QR code</span>
                <FaExternalLinkAlt className="arrow-icon" />
              </li>
              <li onClick={() => setShareContent("profile")}>
                <FaUserCircle className="icon" />
                <span>Share a profile picture</span>
                <FaExternalLinkAlt className="arrow-icon" />
              </li>
            </ul>
            <div>
              <input type="text" ref={inputRef} value={link} readOnly />
              <button className="copy-button" onClick={handleCopy}>{copyButtonText}</button>
            </div>
          </div>
        );
      case "social":
        return <p>Here you can add your card to socials...</p>;

      case "qr":
        return (
          <div className="qr-code-container">
            {link ? (
              <div className="qr-code-wrapper">
                <QRCode value={link} />
                <p>Scan this QR code to visit your card!</p>
                <button onClick={() => downloadQRCode('png')}>
                  Download PNG
                  <FaDownload className="download-icon" />
                </button>
                <button onClick={() => downloadQRCode('svg')}>
                  Download SVG
                  <FaDownload className="download-icon" />
                </button>
              </div>
            ) : (
              <div className="qr-code-placeholder">
                <img src={require('../../../assets/logilink.png')} alt="Placeholder QR code" />
                <p>Create your card first!</p>
              </div>
            )}
          </div>
        );
      case "profile":
        return <p>Share a profile picture here...</p>;
      default:
        return null;
    }
  };


  const str = "this template is : " + templateName;

  return (
    <div className="modif-card-container">
      <SideNav />
      <div className="modif-card-header">
        {isTemplateCreated ?<h2>Modify Card</h2> : <h2>Create new card</h2> }
      </div>
      <div className="main-content-container">
        <div className="main-content-container">
          {templateNameC === "d" && isTemplateCreated && createdCard
            ? <Card setData={setData} createdCard={createdCard} isShow={false} />
            : (templateNameC === "d" && !isTemplateCreated
              ? <Card setData={setData} createdCard={null} isShow={false}/>
              : str)}
        </div>
      </div>
      <div className="circle1 small-decor-circle"></div>
      <div className="circle2 small-decor-circle"></div>
      <div className="circle3 small-decor-circle"></div>

      <div className="modif-card-buttons">
        {showCreateButton && (
          <Button
            variant="primary"
            onClick={handleCreate}
            disabled={!modified}
          >
            Create
          </Button>
        )}
        {showUpdateButton && (
          <Button
            variant="warning"
            onClick={handleUpdateCard}
            disabled={!modified}
          >
            Update
          </Button>
        )}
        {showShareButton && (
          <Button
            variant="success"
            onClick={() => setShowShareModal(true)}
          >
            Share
          </Button>
        )}
      </div>

      {/* Client selection modal (for Create button) */}
      <Modal show={showCreateModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Select Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="clientSelect">
            <Form.Label>Clients:</Form.Label>
            <Select
              options={clientsOptions}
              isSearchable
              placeholder="Search and select a client"
              onChange={handleClientChange}
              value={selectedClient}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseCreateModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Share modal (for Share button) */}
      <Modal className="share-modal" show={showShareModal} onHide={handleCloseShareModal}>
        <Modal.Header closeButton>
          <Modal.Title>{shareContent === "menu" ? "Share Options" : "Share Details"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {renderShareModalContent()}
        </Modal.Body>
        <Modal.Footer>
          {shareContent !== "menu" && (
            <Button variant="primary" onClick={() => setShareContent("menu")}>
              Back
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

ModifCard.propTypes = {
  cardData: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default ModifCard;
