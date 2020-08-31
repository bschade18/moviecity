import React from 'react';

const NoResults = ({ image, text1, text2 }) => {
  return (
    <div>
      <img src={image} alt="no results" className="m-auto no-results-image" />
      <p className="text-center mt-2">{text1}</p>
      <p className="text-center">{text2}</p>
    </div>
  );
};

export default NoResults;
