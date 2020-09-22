import React, { useEffect } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getMessages } from '../../actions/messages';

const MobileNav = ({ getMessages, messages, user, logout }) => {
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
    <div className="mobile-nav">
      <Link to="/home" className="btn">
        <FontAwesome className="fa-home" name="home" size="2x" />
      </Link>
      <Link to="/messages" className="btn">
        <FontAwesome className="fa-envelope" name="envelope" size="2x">
          {unreadFromFriends() > 0 && (
            <div className="notification-badge">
              {unreadFromFriends() > 0 && unreadFromFriends()}
            </div>
          )}
        </FontAwesome>
      </Link>
      <Link to="/search" className="btn">
        <FontAwesome className="fa-search" name="search" size="2x" />
      </Link>
      <Link to={`/${user.username}`} className="btn">
        <FontAwesome className="fa-user" name="search" size="2x" />
      </Link>
      <button className="btn" onClick={logout}>
        <FontAwesome className="fa-sign-out" name="signout" size="2x" />
      </button>
    </div>
  );
};

MobileNav.propTypes = {
  getMessages: PropTypes.func.isRequired,
  messages: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  messages: state.message.messages,
});

export default connect(mapStateToProps, { logout, getMessages })(MobileNav);
