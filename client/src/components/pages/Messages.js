import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import DeleteModal from '../../elements/DeleteModal';

const Message = ({
  message: { sender, imageUrl, movieTitle, message, _id },
}) => (
  <tr>
    <td>{sender}</td>
    <td>
      <img
        className="movie-poster-list-img"
        src={imageUrl}
        alt="movie poster"
      />
    </td>
    <td>{movieTitle}</td>
    <td>{message}</td>
    <td>
      <DeleteModal id={_id} />
    </td>
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
  }, [messages]);

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
            <Link to="/main">
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
                <th></th>
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
