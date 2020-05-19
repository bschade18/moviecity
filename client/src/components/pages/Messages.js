import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

const Message = (props) => (
  <tr>
    <td>{props.message.sender}</td>
    <td>
      <img
        className="movie-poster-list-img"
        src={props.message.imageUrl}
        alt="movie poster"
      />
    </td>
    <td>{props.message.movieTitle}</td>
    <td>{props.message.message}</td>
  </tr>
);

const Messages = ({ user }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios
      .get('/messages')
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const messagesList = () => {
    return messages
      .filter((currentmessage) => currentmessage.recipient === user.name)
      .map((currentmessage) => {
        return <Message message={currentmessage} key={currentmessage._id} />;
      });
  };

  return (
    <div>
      <div id="navigation">
        <div className="navigation-container">
          <div className="navigation-content">
            <Link to="/">
              <p>Home</p>
            </Link>
            <p>|</p>
            <p>Inbox</p>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="table-responsive">
          <table className="table table-hover mt-5">
            <thead>
              <tr>
                <th>From</th>
                <th>Movie</th>
                <th>Title</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>{messagesList()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

Messages.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Messages);
