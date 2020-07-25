import React, { useState, useEffect, useRef, Fragment } from 'react';
import Message from './Message';
import Navigation from '../layout/Navigation';
import Inbox from './Inbox';
import ShowConvo from './ShowConvo';
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
    // eslint-disable-next-line
  }, []);

  const messagesEndRef = useRef(null);
  useEffect(() => {
    if (showMessage) scrollToBottom();
    // eslint-disable-next-line
  }, [conversation]);

  const toggleConvo = (convo) => {
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
      } = convo;
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

  const messagesList = () =>
    messages
      .filter(
        (message) =>
          message.recipient === user.username ||
          message.sender === user.username
      )
      .map((message) => (
        <Message
          toggleConvo={(message) => toggleConvo(message)}
          message={message}
          key={message._id}
          user={user}
        />
      ));

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!text) return;

    addMessage(messageId, { text });

    setText('');
  };

  const renderConvo = () => {
    return conversation.map((mes) => (
      <p
        className={
          mes.name === user.username
            ? 'message-text recipient'
            : 'message-text sender'
        }
        key={mes._id}
      >
        {mes.text}
      </p>
    ));
  };

  if (!currentMessage) {
    return <Spinner />;
  }
  return (
    <Fragment>
      <Navigation page="Messages" />
      <div className="container">
        {!showMessage ? (
          <Inbox messagesList={messagesList} />
        ) : (
          <ShowConvo
            movieImg={movieImg}
            recipient={recipient}
            messageId={messageId}
            toggleConvo={toggleConvo}
            renderConvo={renderConvo}
            onSubmit={onSubmit}
            onChange={onChange}
            movieTitle={movieTitle}
            text={text}
            messagesEndRef={messagesEndRef}
          />
        )}
      </div>
    </Fragment>
  );
};

Messages.propTypes = {
  user: PropTypes.object.isRequired,
  getMessages: PropTypes.func.isRequired,
  setCurrentMessage: PropTypes.func.isRequired,
  currentMessage: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  addMessage: PropTypes.func.isRequired,
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
