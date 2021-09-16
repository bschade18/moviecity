import '../../styles/ChatMessage.css';
import { formattedDate, todayOrYesterday, ampmDt } from '../../utils/dates';
import React from 'react';

const ChatMessage = ({ msg, user, idx, arr, currentMessage }) => {
  const msgSentByUser = msg.user === user._id;
  const prevMsgSentBySameUser = idx > 0 && arr[idx - 1].user === msg.user;
  const prevMsgUser = arr[idx + 1] && arr[idx + 1].user;
  const lastMsgInGroup = msg.user !== prevMsgUser;
  const msgClassName = msgSentByUser ? 'recipient' : 'sender';
  const timestampClassName = msgSentByUser ? 'right' : 'left';

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

  const messageDt = (date) => {
    let datePrefix;
    if (todayOrYesterday(date)) {
      datePrefix = todayOrYesterday(date);
    } else {
      datePrefix = formattedDate(date);
    }

    const ampm = ampmDt(date);
    return `${datePrefix}, ${ampm}`;
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
      <div className={`chat-message-with-timestamp ${timestampClassName}`}>
        <p className={`chat-message-text ${msgClassName}`} key={msg._id}>
          {msg.text}
        </p>
        <p
          className={
            'chat-message-timestamp ' + (!lastMsgInGroup && 'hide-timestamp')
          }
        >
          {messageDt(msg.date)}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
