import React from 'react';
import PropTypes from 'prop-types';

const Message = ({
  message: { sender, imageUrl, movieTitle, conversation, _id, recipient },
  toggleChat,
  user,
}) => (
  <div
    onClick={() =>
      toggleChat({
        sender,
        imageUrl,
        movieTitle,
        conversation,
        _id,
        recipient,
      })
    }
    className="message"
  >
    <div className="message-poster-row">
      <img className="message-movie-img" src={imageUrl} alt="movie poster" />
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
  toggleChat: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default Message;
