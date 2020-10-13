import React from 'react';

const NoResults = ({ image, text1, text2, width, marginTop }) => {
  return (
    <div className="no-results px-2" style={{ marginTop }}>
      <p className="text-center mt-2">{text1}</p>
      <p className="text-center">{text2}</p>
      <img
        src={image}
        style={{ width }}
        alt="no results"
        className="no-results-image"
      />
    </div>
  );
};

NoResults.defaultProps = {
  width: '80%',
  marginTop: '1.5rem',
};

export default NoResults;
