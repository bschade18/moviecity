import React, { useEffect } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';
import { connect } from 'react-redux';
import { getMessages } from '../../actions/messages';
import PropTypes from 'prop-types';

const Sidenav = ({ logout, user, getMessages, messages }) => {
  useEffect(() => {
    getMessages();
  }, [getMessages]);

  const userAndFriendsMessages = () =>
    messages.filter(
      (message) =>
        message.recipient === user.username || message.sender === user.username
    );

  const unreadFromFriends = () => {
    let total = 0;
    userAndFriendsMessages().forEach((message) =>
      message.conversation.forEach((convo) => {
        if (!convo.read && convo.name !== user.username) {
          total++;
        }
      })
    );

    return total;
  };

  return (
    <div className="sidenav">
      <div className="sidenav-user">
        <img
          src={`/uploads/${user.photo}`}
          className="sidenav-user-avatar"
          alt="user"
        />
        <div className="ml-2">{user.username}</div>
      </div>
      <Link to="/home" className="btn">
        <div className="sidenav-item">
          <FontAwesome className="fa-home" name="home" size="2x" />
          <span className="d-block">Home</span>
        </div>
      </Link>
      <Link to="/messages" className="btn">
        <div className="sidenav-item">
          <FontAwesome className="fa-envelope" name="envelope" size="2x">
            {unreadFromFriends() > 0 && (
              <div className="notification-badge">
                {unreadFromFriends() > 0 && unreadFromFriends()}
              </div>
            )}
          </FontAwesome>
          <span className="d-block">Messages</span>
        </div>
      </Link>
      <Link to="/search" className="btn">
        <div className="sidenav-item">
          <FontAwesome className="fa-search" name="search" size="2x" />
          <span className="d-block">Search</span>
        </div>
      </Link>
      <Link to={`/${user.username}`} className="btn">
        <div className="sidenav-item">
          <FontAwesome className="fa-user" name="user" size="2x" />
          <span className="d-block">Profile</span>
        </div>
      </Link>
      <button className="btn" onClick={logout}>
        <div className="sidenav-item">
          <FontAwesome className="fa-sign-out" name="singout" size="2x" />
          <span className="d-block">Logout</span>
        </div>
      </button>
    </div>
  );
};

Sidenav.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  messages: PropTypes.array.isRequired,
  getMessages: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  messages: state.message.messages,
});

export default connect(mapStateToProps, { logout, getMessages })(Sidenav);
