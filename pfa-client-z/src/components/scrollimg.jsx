import React, { useRef } from 'react';
import '../App.css';

const templates = [
  { imgSrc: 'path/to/image1.png', alt: 'Template 1' },
  { imgSrc: 'path/to/image2.png', alt: 'Template 2' },
  { imgSrc: 'path/to/image3.png', alt: 'Template 3' },
  { imgSrc: 'path/to/image4.png', alt: 'Template 4' },
  { imgSrc: 'path/to/image5.png', alt: 'Template 5' },
  { imgSrc: 'path/to/image6.png', alt: 'Template 6' },
];

const ScrollImg = () => {
  const containerRef = useRef(null);

  const scrollLeft = () => {
    containerRef.current.scrollBy({ left: -1080, behavior: 'smooth' });
  };

  const scrollRight = () => {
    containerRef.current.scrollBy({ left: 1080, behavior: 'smooth' });
  };

  return (
    <div className="scrolling">
      
      <button className="arrow-button left" onClick={scrollLeft}>
        &#8249;
      </button>
      <div className="templates-container" ref={containerRef}>
        {templates.map((template, index) => (
          <div key={index} className="template-card">
            <img src={template.imgSrc} alt={template.alt} />
          </div>
        ))}
      </div>
      <button className="arrow-button right" onClick={scrollRight}>
        &#8250;
      </button>
    </div>
  );
};

export default ScrollImg;
