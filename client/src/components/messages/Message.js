import React from 'react';
import PropTypes from 'prop-types';

const Message = ({
  message: { sender, imageUrl, movieTitle, conversation, _id, recipient },
  toggleChat,
  user,
}) => {
  const unreadCount = () => {
    let total = 0;
    conversation.forEach((convo) => {
      if (!convo.read && convo.name !== user.username) {
        total++;
      }
    });

    return total;
  };
  return (
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
        <div className="message-img-container">
          <img
            className="message-movie-img"
            src={imageUrl}
            alt="movie poster"
          ></img>
          {unreadCount() > 0 && (
            <div className="process-step-msg">
              {unreadCount() > 0 && unreadCount()}
            </div>
          )}
        </div>
      </div>

      <div className="left-text message-content-row">
        {movieTitle}{' '}
        <div>
          {user.username === sender ? `with: ${recipient}` : `with: ${sender}`}
        </div>
      </div>
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.object.isRequired,
  toggleChat: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default Message;
