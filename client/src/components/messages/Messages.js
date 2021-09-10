import '../../styles/Messages.css';
import React, { useState, useEffect, useRef } from 'react';
import Chat from './Chat';
import FeedHeader from '../layout/FeedHeader';
import AppGrid from '../layout/AppGrid';
import Feed from '../layout/Feed';
import Spinner from '../layout/Spinner';
import MessageList from './MessageList';
import { useWindowSize } from '../hooks/useWindowSize';
import {
  getMessages,
  setCurrentMessage,
  updateMessage,
} from '../../actions/messages';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import useFormState from '../hooks/useFormState';

const Messages = ({
  user,
  getMessages,
  messages,
  currentMessage,
  setCurrentMessage,
  loading,
  updateMessage,
}) => {
  const [showChat, setShowChat] = useState(false);
  const [text, setText, resetText] = useFormState('');
  const messagesEndRef = useRef(null);

  const size = useWindowSize();

  useEffect(() => {
    getMessages();
  }, [getMessages]);

  const toggleChat = (chat) => {
    if (showChat) {
      setShowChat(false);
      getMessages();
    } else {
      setShowChat(true);
      setCurrentMessage({ ...chat });
      readMessages(chat.conversation, chat._id);
    }
  };

  const readMessages = (chat, messageId) => {
    const conversation = chat.map((chatMessage) => {
      if (chatMessage.user !== user._id) {
        chatMessage.read = true;
        return chatMessage;
      } else {
        return chatMessage;
      }
    });

    updateMessage(messageId, { conversation });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!text) return;

    updateMessage(currentMessage._id, {
      conversation: [...currentMessage.conversation, { user: user._id, text }],
    });

    resetText('');
  };

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
  };

  const nonUserPhoto = () => {
    if (currentMessage.recipient._id === user._id) {
      return currentMessage.sender.photo;
    } else {
      return currentMessage.recipient.photo;
    }
  };

  if (!currentMessage || !messages) {
    return <Spinner />;
  }
  return (
    <AppGrid component="messages" showChat={showChat}>
      <Feed>
        {!showChat && (
          <FeedHeader
            heading="Messages"
            component="messages"
            showChat={showChat}
          />
        )}
        {showChat ? (
          <Chat
            user={user}
            toggleChat={toggleChat}
            onSubmit={onSubmit}
            setText={setText}
            currentMessage={currentMessage}
            text={text}
            messagesEndRef={messagesEndRef}
            scrollToBottom={scrollToBottom}
            height={size.height}
            nonUserPhoto={nonUserPhoto}
          />
        ) : (
          <MessageList
            messages={messages}
            loading={loading}
            user={user}
            toggleChat={toggleChat}
          />
        )}
      </Feed>
    </AppGrid>
  );
};

Messages.propTypes = {
  user: PropTypes.object.isRequired,
  getMessages: PropTypes.func.isRequired,
  setCurrentMessage: PropTypes.func.isRequired,
  currentMessage: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  messages: PropTypes.array.isRequired,
  updateMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  messages: state.message.messages,
  currentMessage: state.message.currentMessage,
  loading: state.message.loading,
});

export default connect(mapStateToProps, {
  getMessages,
  setCurrentMessage,
  updateMessage,
})(Messages);
