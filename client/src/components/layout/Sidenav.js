import '../../styles/Sidenav.css';
import React, { useEffect } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';
import { connect } from 'react-redux';
import { getMessages } from '../../actions/messages';
import PropTypes from 'prop-types';

const Sidenav = ({ getMessages, messages, user, logout, component }) => {
  useEffect(() => {
    getMessages();
  }, [getMessages]);

  const messagesWithFriends = () =>
    messages.filter(
      ({ recipient, sender }) =>
        recipient._id === user._id || sender._id === user._id
    );

  const unreadFromFriends = () => {
    let total = 0;
    messagesWithFriends().forEach((message) =>
      message.conversation.forEach((convo) => {
        if (!convo.read && convo.user !== user._id) {
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
          <FontAwesome
            className={`fa-home ${component === 'home' && 'primary-color'}`}
            name="home"
            size="2x"
          />
          <span
            className={`d-block ${component === 'home' && 'primary-color'}`}
          >
            Home
          </span>
        </div>
      </Link>
      <Link to="/messages" className="btn">
        <div className="sidenav-item">
          <FontAwesome
            className={`fa-envelope ${
              component === 'messages' && 'primary-color'
            }`}
            name="envelope"
            size="2x"
          >
            {unreadFromFriends() > 0 && (
              <div className="notification-badge">{unreadFromFriends()}</div>
            )}
          </FontAwesome>
          <span
            className={`d-block ${component === 'messages' && 'primary-color'}`}
          >
            Messages
          </span>
        </div>
      </Link>
      <Link to="/search" className="btn">
        <div className="sidenav-item">
          <FontAwesome
            className={`fa-search ${component === 'search' && 'primary-color'}`}
            name="search"
            size="2x"
          />
          <span
            className={`d-block ${component === 'search' && 'primary-color'}`}
          >
            Search
          </span>
        </div>
      </Link>
      <Link to={`/${user.username}`} className="btn">
        <div className="sidenav-item">
          <FontAwesome
            className={`fa-user ${component === 'profile' && 'primary-color'}`}
            name="user"
            size="2x"
          />
          <span
            className={`d-block ${component === 'profile' && 'primary-color'}`}
          >
            Profile
          </span>
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
  component: PropTypes.string,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  messages: state.message.messages,
});

export default connect(mapStateToProps, { logout, getMessages })(Sidenav);
