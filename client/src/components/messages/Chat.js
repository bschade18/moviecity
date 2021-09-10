import '../../styles/Chat.css';
import React, { useEffect } from 'react';
import ChatInput from './ChatInput';
import PropTypes from 'prop-types';
import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';

const Chat = ({
  currentMessage,
  toggleChat,
  onSubmit,
  setText,
  text,
  scrollToBottom,
  messagesEndRef,
  height,
  user,
}) => {
  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);
  return (
    <div className="show-chat" style={{ height: height - 2 }}>
      <ChatHeader
        imageUrl={currentMessage.imageUrl}
        movieTitle={currentMessage.movieTitle}
        toggleChat={toggleChat}
        id={currentMessage._id}
      />
      <ChatBody
        user={user}
        currentMessage={currentMessage}
        messagesEndRef={messagesEndRef}
      />
      <ChatInput onSubmit={onSubmit} setText={setText} text={text} />
    </div>
  );
};

Chat.propTypes = {
  currentMessage: PropTypes.object.isRequired,
  toggleChat: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  setText: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  scrollToBottom: PropTypes.func.isRequired,
  messagesEndRef: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default Chat;
