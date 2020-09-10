import React from 'react';
import PropTypes from 'prop-types';

const FeedHeader = ({ heading, setShowMovieSearch }) => {
  return (
    <div className="feed-header">
      <div className="feed-header-heading">
        <span
          className="feed-header-movie-search"
          onClick={() => setShowMovieSearch(true)}
        >
          {heading}
        </span>
        <span
          className="feed-header-user-search"
          onClick={() => setShowMovieSearch(false)}
        >
          {heading === 'Movie Search' && '| User Search'}
        </span>
      </div>
    </div>
  );
};

FeedHeader.propTypes = {
  heading: PropTypes.string.isRequired,
};

export default FeedHeader;
