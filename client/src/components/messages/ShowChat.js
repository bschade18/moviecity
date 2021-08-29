import '../../styles/ShowChat.css';
import React, { useEffect } from 'react';
import DeleteModal from './DeleteModal';
import PropTypes from 'prop-types';

const ShowChat = ({
  currentMessage: { movieTitle, imageUrl, _id },
  toggleChat,
  renderChat,
  onSubmit,
  setText,
  text,
  scrollToBottom,
  messagesEndRef,
  height,
}) => {
  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);
  return (
    <div className="show-chat" style={{ height: height - 2 }}>
      <div className="show-chat-heading">
        <span className="show-chat-heading-left">
          <img className="show-chat-img mr-3" src={imageUrl} alt="movie" />
          <h3 className="show-chat-movietitle">{movieTitle}</h3>
        </span>

        <div className="show-chat-icons">
          <i className="fa fa-times" onClick={toggleChat}></i>
          <DeleteModal id={_id} toggleChat={toggleChat} />
        </div>
      </div>
      <div className="show-chat-body">
        <div className="show-chat-messages">{renderChat()}</div>
        <div ref={messagesEndRef} />
      </div>

      <form className="show-chat-form" onSubmit={onSubmit}>
        <input
          onChange={setText}
          type="text"
          className="form-control"
          value={text}
        />
        <input
          className="btn btn-success ml-1"
          type="submit"
          id="submit"
          value="Reply"
        />
      </form>
    </div>
  );
};

ShowChat.propTypes = {
  currentMessage: PropTypes.object.isRequired,
  toggleChat: PropTypes.func.isRequired,
  renderChat: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  setText: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  scrollToBottom: PropTypes.func.isRequired,
  messagesEndRef: PropTypes.object.isRequired,
};

export default ShowChat;
