import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import ShowChat from './ShowChat';
import FeedHeader from '../layout/FeedHeader';
import AppGrid from '../layout/AppGrid';
import Feed from '../layout/Feed';
import NoResults from '../elements/NoResults';
import {
  getMessages,
  setCurrentMessage,
  addMessage,
} from '../../actions/messages';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Messages = ({
  user,
  getMessages,
  messages,
  setCurrentMessage,
  currentMessage,
  addMessage,
  loading,
}) => {
  const [showMessage, setShowMessage] = useState(false);
  const [text, setText] = useState('');

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

  const messagesEndRef = useRef(null);

  const toggleChat = (chat) => {
    if (showMessage) {
      if (!loading) {
        if (messages) {
          setShowMessage(false);
          setCurrentMessage({
            movieTitle: '',
            sender: '',
            conversation: [],
            messageId: '',
            movieImg: '',
            recipient: '',
          });
        }
        getMessages();
      }
    } else {
      const {
        movieTitle,
        sender,
        conversation,
        _id,
        imageUrl,
        recipient,
      } = chat;
      setShowMessage(true);
      setCurrentMessage({
        movieTitle,
        sender,
        recipient,
        conversation,
        messageId: _id,
        movieImg: imageUrl,
      });
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const messagesList = () => {
    const userAndFriendsMessages = messages.filter(
      (message) =>
        message.recipient === user.username || message.sender === user.username
    );

    if (!userAndFriendsMessages && !loading) {
      return (
        <NoResults
          image="https://www.slashfilm.com/wp/wp-content/images/tommy-boy-contest.jpg"
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

  const onChange = (e) => setText(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!text) return;

    addMessage(messageId, { text });
    scrollToBottom();

    setText('');
  };

  const renderChat = () =>
    conversation.map((mes) => (
      <p
        className={
          mes.name === user.username
            ? 'show-chat-text recipient'
            : 'show-chat-text sender'
        }
        key={mes._id}
      >
        {mes.text}
      </p>
    ));

  if (!currentMessage || !messages) {
    return <Spinner />;
  }
  return (
    <AppGrid>
      <Feed>
        <FeedHeader heading="Messages" />
        {!showMessage ? (
          messagesList()
        ) : (
          <ShowChat
            movieImg={movieImg}
            recipient={recipient}
            messageId={messageId}
            toggleChat={toggleChat}
            renderChat={renderChat}
            onSubmit={onSubmit}
            onChange={onChange}
            movieTitle={movieTitle}
            text={text}
            messagesEndRef={messagesEndRef}
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
  addMessage: PropTypes.func.isRequired,
  messages: PropTypes.array.isRequired,
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
})(Messages);
