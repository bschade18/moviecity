import React from 'react';
import PropTypes from 'prop-types';

const Message = ({
  message: { sender, recipient, imageUrl, movieTitle, conversation, _id },
  toggleChat,
  user,
}) => {
  const unreadCount = () => {
    let total = 0;
    conversation.forEach((convo) => {
      if (!convo.read && convo.user !== user._id) {
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
            <div className="notification-badge-msg">{unreadCount()}</div>
          )}
        </div>
      </div>

      <div className="left-text message-content-row">
        {movieTitle}{' '}
        <div>
          {user._id === sender._id
            ? `with: ${recipient.username}`
            : `with: ${sender.username}`}
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
