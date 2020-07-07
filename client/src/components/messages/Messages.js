import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import Navigation from '../layout/Navigation';
import Inbox from './Inbox';
import ShowConvo from './ShowConvo';
import {
  getMessages,
  setCurrentMessage,
  updateMessages,
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
  updateMessages,
  loading,
}) => {
  const [showMessage, setShowMessage] = useState(false);
  const [text, setText] = useState('');

  const {
    movieTitle,
    sender,
    conversation,
    messageId,
    movieImg,
  } = currentMessage;

  useEffect(() => {
    getMessages();
    // eslint-disable-next-line
  }, [text]);

  const messagesEndRef = useRef(null);
  useEffect(() => {
    if (showMessage) scrollToBottom();
    // eslint-disable-next-line
  }, [conversation]);

  const toggleConvo = (convo) => {
    const { movieTitle, sender, conversation, _id, imageUrl } = convo;
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
          });
        }
      }
    } else {
      setShowMessage(true);
      setCurrentMessage({
        movieTitle,
        sender,
        conversation,
        messageId: _id,
        movieImg: imageUrl,
      });
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  // display all messages in inbox
  const messagesList = () => {
    return messages
      .filter(
        (message) =>
          message.recipient === user.name || message.sender === user.name
      )
      .map((message) => {
        return (
          <Message
            toggleConvo={(message) => toggleConvo(message)}
            message={message}
            key={message._id}
          />
        );
      });
  };

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!text) return;
    // show new message in UI
    setCurrentMessage({
      ...currentMessage,
      conversation: [...conversation, { name: user.name, message: text }],
    });

    const updatedMessage = {
      ...currentMessage,
      conversation: [...conversation, { name: user.name, message: text }],
    };

    // update DB
    updateMessages(messageId, updatedMessage);

    setText('');
  };

  const renderConvo = () => {
    return conversation.map((mes) => (
      <p
        className={
          mes.name === sender ? 'message-text sender' : 'message-text recipient'
        }
        key={mes._id}
      >
        {mes.message}
      </p>
    ));
  };

  if (!messages.length) {
    return <Spinner />;
  }
  return (
    <div>
      <Navigation page="Inbox" />
      <div className="container">
        {!showMessage ? (
          <Inbox messagesList={messagesList} />
        ) : (
          <ShowConvo
            movieImg={movieImg}
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
    </div>
  );
};

Messages.propTypes = {
  user: PropTypes.object.isRequired,
  getMessages: PropTypes.func,
  setCurrentMessage: PropTypes.func,
  currentMessage: PropTypes.object,
  updateMessages: PropTypes.func,
  loading: PropTypes.bool,
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
  updateMessages,
})(Messages);
