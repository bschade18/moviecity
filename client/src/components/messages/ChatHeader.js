import '../../styles/ChatHeader.css';
import React from 'react';
import DeleteModal from './DeleteModal';

const ChatHeader = ({ imageUrl, movieTitle, toggleChat, id }) => (
  <div className="chat-header">
    <span className="chat-header-left">
      <img
        className="chat-header-movie-poster mr-3"
        src={imageUrl}
        alt="movie"
      />
      <h3 className="chat-header-movietitle">{movieTitle}</h3>
    </span>
    <div className="chat-header-icons">
      <i className="fa fa-times" onClick={toggleChat}></i>
      <DeleteModal id={id} toggleChat={toggleChat} />
    </div>
  </div>
);

export default ChatHeader;
