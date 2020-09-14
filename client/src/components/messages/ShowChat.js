import React from 'react';
import DeleteModal from './DeleteModal';

const ShowChat = ({
  movieImg,
  messageId,
  movieTitle,
  toggleChat,
  renderChat,
  onSubmit,
  setText,
  text,
  messagesEndRef,
}) => (
  <div className="show-chat">
    <div className="show-chat-heading">
      <span className="show-chat-heading-left">
        <img className="show-chat-img mr-3" src={movieImg} alt="movie" />
        <h3 className="show-chat-movietitle">{movieTitle}</h3>
      </span>

      <div className="show-chat-icons">
        <i className="fa fa-times" onClick={toggleChat}></i>
        <DeleteModal id={messageId} toggleChat={toggleChat} />
      </div>
    </div>
    <div className="show-chat-body">
      <div className="show-chat-messages mb-5">{renderChat()}</div>
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

export default ShowChat;
