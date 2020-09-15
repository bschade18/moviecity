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
  addMessage,
  updateMessages,
} from '../../actions/messages';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NoResultsImage from '../../img/tommy-boy-car-fire copy.jpg';
import useFormState from '../hooks/useFormState';

const Messages = ({
  user,
  getMessages,
  messages,
  currentMessage,
  setCurrentMessage,
  addMessage,
  loading,
  updateMessages,
}) => {
  const [showChat, setShowChat] = useState(false);
  const [text, setText, resetText] = useFormState('');
  const messagesEndRef = useRef(null);

  const {
    movieTitle,
    conversation,
    messageId,
    movieImg,
    recipient,
  } = currentMessage;

  useEffect(() => {
    getMessages();
  }, [getMessages]);

  const renderMessagesList = () => {
    const userAndFriendsMessages = messages.filter(
      (message) =>
        message.recipient === user.username || message.sender === user.username
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
      setCurrentMessage({
        movieTitle: chat.movieTitle,
        sender: chat.sender,
        recipient: chat.recipient,
        conversation: chat.conversation,
        messageId: chat._id,
        movieImg: chat.imageUrl,
      });
      readMessages(chat.conversation, chat._id);
    }
  };

  const readMessages = (chat, messageId) => {
    const readChat = chat.map((chatMessage) => {
      if (chatMessage.name !== user.username) {
        chatMessage.read = true;
        return chatMessage;
      } else {
        return chatMessage;
      }
    });

    updateMessages(messageId, { readChat });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!text) return;

    addMessage(messageId, { text }, scrollToBottom);

    resetText('');
  };

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
  };

  const renderChat = () =>
    conversation.map((msg) => (
      <p
        className={
          'show-chat-text ' +
          (msg.name === user.username ? 'recipient' : 'sender')
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
    <AppGrid>
      <Feed>
        <FeedHeader heading="Messages" />
        {showChat ? (
          <ShowChat
            movieImg={movieImg}
            recipient={recipient}
            messageId={messageId}
            toggleChat={toggleChat}
            renderChat={renderChat}
            onSubmit={onSubmit}
            setText={setText}
            movieTitle={movieTitle}
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
  addMessage: PropTypes.func.isRequired,
  messages: PropTypes.array.isRequired,
  updateMessages: PropTypes.func.isRequired,
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
  addMessage,
  updateMessages,
})(Messages);
