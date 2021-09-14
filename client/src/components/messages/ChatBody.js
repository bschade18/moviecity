import '../../styles/ChatBody.css';
import React from 'react';
import ChatMessage from './ChatMessage';

const ChatBody = ({ currentMessage, messagesEndRef, user }) => (
  <div className="chat-body">
    <div className="chat-body-messages">
      {currentMessage.conversation.map((msg, idx, arr) => (
        <ChatMessage
          key={msg._id}
          currentMessage={currentMessage}
          user={user}
          msg={msg}
          idx={idx}
          arr={arr}
        />
      ))}
    </div>
    <div ref={messagesEndRef} />
  </div>
);

export default ChatBody;
