import '../../styles/NoResults.css';
import React from 'react';

interface NoResultsProps {
  image: string;
  text1: string;
  text2?: string;
  component?: string;
}

const NoResults = ({ component, text1, text2, image }: NoResultsProps) => (
  <div className={component === 'Search' ? 'no-results-search' : 'no-results'}>
    <div>
      <p className="text-center my-2">{text1}</p>
      <p className="text-center">{text2}</p>
    </div>
    <img src={image} alt="no results" className="no-results-image" />
  </div>
);

export default NoResults;
