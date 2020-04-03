import React from 'react';
import '../App.css';

const Showcase = ({ image, title }) => {
  const showcaseStyle = image => ({
    background: `url(${image}) no-repeat center center/cover`,
    height: '100vh'
  });

  return (
    <div className="showcase" style={showcaseStyle(image)}>
      <div className="showcase-content">
        <div className="showcase-text">
          <h1>{title}</h1>
        </div>
      </div>
    </div>
  );
};

export default Showcase;
