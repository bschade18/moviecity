import '../../styles/ChatBody.css';
import React from 'react';
import ChatMessage from './ChatMessage';

const ChatBody = ({ currentMessage, messagesEndRef, user }) => (
  <div className="show-chat-body">
    <div className="show-chat-messages">
      {currentMessage.conversation.map((msg, idx, arr) => (
        <ChatMessage
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
