import '../../styles/NoResults.css';
import React from 'react';

interface NoResultsProps {
image: string,
text1: string,
text2?: string,
component?: string
}

const NoResults = ({ image, text1, text2, component } : NoResultsProps) => {
  return (
    <div
      className={component === 'Search' ? 'no-results-search' : 'no-results'}
    >
      <p className="text-center mt-2">{text1}</p>
      <p className="text-center">{text2}</p>
      <img src={image} alt="no results" className="no-results-image" />
    </div>
  );
};

export default NoResults;
