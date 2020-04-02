import React from "react";
import "../App.css";

const HeroImage = ({ image, title, text }) => {
  const heroStyle = image => ({
    background: `url(${image}) no-repeat center center/cover`,
    height: "100vh",
    border: "1px solid black"
  });

  return (
    <div className="hero" style={heroStyle(image)}>
      <div className="heroimage-content">
        <div className="heroimage-text">
          <h1>{title}</h1>
        </div>
      </div>
    </div>
  );
};

export default HeroImage;
