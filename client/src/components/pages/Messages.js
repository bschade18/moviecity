import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import DeleteModal from '../../elements/DeleteModal';

const Message = ({
  message: { sender, imageUrl, movieTitle, message, _id },
  toggleConvo,
}) => {
  return (
    <tr
      onClick={() =>
        toggleConvo({ sender, imageUrl, movieTitle, message, _id })
      }
    >
      <td>{sender}</td>
      <td>
        <img
          className="movie-poster-list-img"
          src={imageUrl}
          alt="movie poster"
        />
      </td>
      <td>{movieTitle}</td>
      <td className="movie-table-message">{message[0].message}</td>
      <td>
        <DeleteModal id={_id} />
      </td>
    </tr>
  );
};

const Messages = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [text, setText] = useState('');
  const [movie, setMovie] = useState({
    movieTitle: '',
    sender: '',
    message: [],
    movieId: '',
    movieImg: '',
  });

  const { movieTitle, sender, message, movieId, movieImg } = movie;

  useEffect(() => {
    axios
      .get('/messages')
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [messages]);

  const messagesEndRef = useRef(null);
  useEffect(() => {
    if (showMessage) scrollToBottom();
    // eslint-disable-next-line
  }, [message]);

  const toggleConvo = (convo) => {
    const { movieTitle, sender, message, _id, imageUrl } = convo;
    if (showMessage) {
      setShowMessage(false);
      setMovie({
        movieTitle: '',
        sender: '',
        message: [],
        movieId: '',
        movieImg: '',
      });
    } else {
      setShowMessage(true);
      setMovie({
        movieTitle,
        sender,
        message,
        movieId: _id,
        movieImg: imageUrl,
      });
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

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

    setMovie({
      ...movie,
      message: [...message, { name: user.name, message: text }],
    });
    setText('');

    const messages = {
      message: [...message, { name: user.name, message: text }],
    };

    axios
      .put(`/messages/${movieId}`, messages)
      .then((res) => console.log(res.data));
  };

  const renderConvo = () => {
    return message.map((mes) => (
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

  return (
    <div>
      <div id="navigation">
        <div className="navigation-container">
          <div className="navigation-content">
            <Link to="/main">
              <p>Home</p>
            </Link>
            <p>|</p>
            <p>Inbox</p>
          </div>
        </div>
      </div>
      <div className="container">
        {!showMessage ? (
          <div className="table-responsive">
            <table className="table table-hover mt-5">
              <thead>
                <tr>
                  <th>Sender</th>
                  <th>Movie</th>
                  <th>Title</th>
                  <th className="movie-table-message">Message</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{messagesList()}</tbody>
            </table>
          </div>
        ) : (
          <div className="message-container">
            <div className="message-container-heading">
              <span className="message-heading-left">
                <img className="message-img mr-3" src={movieImg} alt="movie" />
                <h3 className="message-movietitle">{movieTitle}</h3>
              </span>
              <button
                className="btn btn-primary close-btn"
                onClick={toggleConvo}
              >
                Close
              </button>
            </div>
            <div id="message-body">
              <div className="messages mb-5">{renderConvo()}</div>
              <div ref={messagesEndRef} />
            </div>
            <form className="message-form" onSubmit={onSubmit}>
              <input
                onChange={onChange}
                type="text"
                className="message-reply form-control"
                value={text}
              />
              <input
                className="btn btn-secondary messages-reply-submit ml-1"
                type="submit"
                id="submit"
                value="Reply"
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

Messages.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Messages);
