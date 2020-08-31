import React from 'react';
import PropTypes from 'prop-types';

const FeedHeader = ({ heading }) => {
  return (
    <div className="feed-header">
      <div className="feed-header-heading">
        <p>{heading}</p>
      </div>
    </div>
  );
};

FeedHeader.propTypes = {
  heading: PropTypes.string.isRequired,
};

export default FeedHeader;
