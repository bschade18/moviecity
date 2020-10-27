import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import ShowChat from './ShowChat';
import FeedHeader from '../layout/FeedHeader';
import AppGrid from '../layout/AppGrid';
import Feed from '../layout/Feed';
import NoResults from '../elements/NoResults';
import Spinner from '../layout/Spinner';
import {
  getMessages,
  setCurrentMessage,
  updateMessage,
} from '../../actions/messages';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NoResultsImage from '../../img/tommy.jpg';
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

  useEffect(() => {
    getMessages();
  }, [getMessages]);

  const renderMessagesList = () => {
    const userAndFriendsMessages = messages.filter(
      (message) =>
        message.recipient._id === user._id || message.sender._id === user._id
    );

    if (!userAndFriendsMessages.length && !loading) {
      return (
        <NoResults
          image={NoResultsImage}
          text1="All because you wanted to save a couple extra pennies..."
          text2="Messages between you and friends will display here"
        />
      );
    } else {
      return userAndFriendsMessages.map((message) => (
        <Message
          toggleChat={(message) => toggleChat(message)}
          message={message}
          key={message._id}
          user={user}
        />
      ));
    }
  };

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

  const renderChat = () =>
    currentMessage.conversation.map((msg) => (
      <p
        className={
          'show-chat-text ' + (msg.user === user._id ? 'recipient' : 'sender')
        }
        key={msg._id}
      >
        {msg.text}
      </p>
    ));

  if (!currentMessage || !messages) {
    return <Spinner />;
  }
  return (
    <AppGrid component="messages">
      <Feed>
        <FeedHeader heading="Messages" />
        {showChat ? (
          <ShowChat
            toggleChat={toggleChat}
            renderChat={renderChat}
            onSubmit={onSubmit}
            setText={setText}
            currentMessage={currentMessage}
            text={text}
            messagesEndRef={messagesEndRef}
            scrollToBottom={scrollToBottom}
          />
        ) : (
          renderMessagesList()
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
