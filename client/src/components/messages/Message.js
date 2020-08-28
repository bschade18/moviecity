import React from 'react';
import PropTypes from 'prop-types';

const Message = ({
  message: { sender, imageUrl, movieTitle, conversation, _id, recipient },
  toggleConvo,
  user,
}) => (
  <div
    onClick={() =>
      toggleConvo({
        sender,
        imageUrl,
        movieTitle,
        conversation,
        _id,
        recipient,
      })
    }
    className="inbox"
  >
    <div className="message-poster-row">
      <img
        className="movie-poster-list-img"
        src={imageUrl}
        alt="movie poster"
      />
    </div>

    <div className="left-text message-content-row">
      {movieTitle}{' '}
      <div>
        {user.username === sender ? `with: ${recipient}` : `with: ${sender}`}
      </div>
    </div>
  </div>
);

Message.propTypes = {
  message: PropTypes.object.isRequired,
  toggleConvo: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default Message;
