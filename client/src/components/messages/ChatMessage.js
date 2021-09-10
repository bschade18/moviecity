import '../../styles/ChatMessage.css';
import React from 'react';

const ChatMessage = ({ msg, user, idx, arr, currentMessage }) => {
  const msgSentByUser = msg.user === user._id;
  const prevMsgSentBySameUser = idx > 0 && arr[idx - 1].user === msg.user;
  const msgClassName = msgSentByUser ? 'recipient' : 'sender';

  const nonUserProfilePhoto = () => {
    const userIsRecipient = currentMessage.recipient._id === user._id;
    const senderProfilePhoto = currentMessage.sender.photo;
    const recipientProfilePhoto = currentMessage.recipient.photo;

    if (userIsRecipient) {
      return senderProfilePhoto;
    } else {
      return recipientProfilePhoto;
    }
  };

  return (
    <div className={`chat-message ${msgClassName}`} key={msg._id}>
      <img
        alt="user"
        src={`/uploads/${nonUserProfilePhoto()}`}
        className={
          'chat-message-user-photo ' +
          ((msgSentByUser || prevMsgSentBySameUser) && 'hide-user-photo')
        }
      />
      <p className={`chat-message-text ${msgClassName}`} key={msg._id}>
        {msg.text}
      </p>
    </div>
  );
};

export default ChatMessage;
