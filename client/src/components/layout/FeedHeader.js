import React from 'react';
import PropTypes from 'prop-types';

const FeedHeader = ({ heading }) => {
  return (
    <div className="scroll-nav">
      <div className="scroll-heading">
        <p className="home-title">{heading}</p>
      </div>
    </div>
  );
};

FeedHeader.propTypes = {
  heading: PropTypes.string.isRequired,
};

export default FeedHeader;
