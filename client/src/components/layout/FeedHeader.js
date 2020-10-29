import React from 'react';
import PropTypes from 'prop-types';

const FeedHeader = ({ heading, setShowMovieSearch, component, showChat }) => {
  return (
    <div
      className={
        component === 'messages' && showChat
          ? 'feed-header-chat'
          : 'feed-header'
      }
    >
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
          {heading === 'Movie Search' && (
            <>
              <span className="feed-header-vertical-bar">|</span>{' '}
              <span className="feed-header-user-search-text">User Search</span>
            </>
          )}
        </span>
      </div>
    </div>
  );
};

FeedHeader.propTypes = {
  heading: PropTypes.string.isRequired,
};

export default FeedHeader;
