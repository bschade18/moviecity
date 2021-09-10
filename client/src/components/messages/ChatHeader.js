import '../../styles/ChatHeader.css';
import React from 'react';
import DeleteModal from './DeleteModal';

const ChatHeader = ({ imageUrl, movieTitle, toggleChat, id }) => (
  <div className="show-chat-heading">
    <span className="show-chat-heading-left">
      <img className="show-chat-img mr-3" src={imageUrl} alt="movie" />
      <h3 className="show-chat-movietitle">{movieTitle}</h3>
    </span>
    <div className="show-chat-icons">
      <i className="fa fa-times" onClick={toggleChat}></i>
      <DeleteModal id={id} toggleChat={toggleChat} />
    </div>
  </div>
);

export default ChatHeader;
