import React, { useState, useEffect, useRef } from 'react';

const TemplateA = ({ templateId }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [buttonText, setButtonText] = useState('Click');
  const token = localStorage.getItem('token');
  const buttonRef = useRef(null);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/gettemplate/${templateId}`);
        const data = await res.json();
        if (data.success) {
          setButtonText(data.template.button.content);
        }
      } catch (error) {
        console.error('Error fetching template:', error);
      }
    };

    fetchTemplate();
  }, [templateId]);

  const handleEditClick = () => {
    setIsEditable(true);
    buttonRef.current.contentEditable = true;
    buttonRef.current.focus();
  };

  const handleSaveClick = async () => {
    setIsEditable(false);
    buttonRef.current.contentEditable = false;
    setButtonText(buttonRef.current.innerText);

    try {
      const res = await fetch(`http://localhost:3001/api/modifytemplate/${templateId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: token, buttonContent: buttonRef.current.innerText }),
      });

      const result = await res.json();
      if (!result.success) {
        console.error('Error saving template:', result.message);
      }
    } catch (error) {
      console.error('Error saving template:', error);
    }
  };

  return (
    <div>
      <h1>Template A</h1>
      <p>Template ID: {templateId}</p>
      <button ref={buttonRef} suppressContentEditableWarning={true}>
        {buttonText}
      </button>
      <button onClick={handleEditClick}>Click me to edit</button>
      <button onClick={handleSaveClick}>Click me to save</button>
    </div>
  );
};

export default TemplateA;
