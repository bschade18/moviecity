import '../../styles/ChatMessage.css';
import React from 'react';

const ChatMessage = ({ msg, user, nonUserPhoto, idx, arr }) => (
  <div
    className={
      'msg-container ' + (msg.user === user._id ? 'recipient' : 'sender')
    }
    key={msg._id}
  >
    <img
      alt="user"
      src={`/uploads/${nonUserPhoto()}`}
      className={
        'show-chat-user-avatar ' +
        ((msg.user === user._id ||
          (idx > 0 && arr[idx - 1].user === msg.user)) &&
          'sender-avatar')
      }
    />
    <p
      className={
        'show-chat-text ' + (msg.user === user._id ? 'recipient' : 'sender')
      }
      key={msg._id}
    >
      {msg.text}
    </p>
  </div>
);

export default ChatMessage;
