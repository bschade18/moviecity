import React, { useEffect } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getMessages } from '../../actions/messages';

const MobileNav = ({ logout, user, getMessages, messages }) => {
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
    <div className="mobile-nav">
      <Link to="/home" className="btn">
        <FontAwesome className="fa-home" name="home" size="2x" />
      </Link>
      <Link to="/messages" className="btn">
        <FontAwesome className="fa-envelope" name="envelope" size="2x">
          {unreadFromFriends() > 0 && (
            <div className="process-step">
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
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  getMessages: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  messages: state.message.messages,
});

export default connect(mapStateToProps, { logout, getMessages })(MobileNav);
