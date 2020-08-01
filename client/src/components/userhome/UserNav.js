import React from 'react';
import PropTypes from 'prop-types';

const UserNav = ({ user, users, username, renderNavButton, toggleFriend }) => {
  return (
    <div className="scroll-nav">
      <div className="scroll-heading">
        <img
          className="user-photo"
          src={
            users.filter((user) => user.username === username)[0].photo
              ? `/uploads/${
                  users.filter((user) => user.username === username)[0].photo
                }`
              : `/uploads/no-photo.jpg`
          }
          alt="user"
        />
        <p className="home-title">
          {users.filter((user) => user.username === username)[0].name}
        </p>
        <button
          className={
            'btn ml-3  ' +
            (user.username === username ? 'd-none ' : 'd-block btn-success ') +
            (user.friends.includes(username) ? 'friend-btn' : 'friend-btn-hide')
          }
          onClick={() => toggleFriend()}
        >
          <span> {user.friends.includes(username) ? '' : 'Add Friend'}</span>
        </button>
      </div>
      <div className="user-nav mt-3">
        {renderNavButton('Reviews')}
        {renderNavButton('Favorites')}
        {renderNavButton('Watchlist')}
        {user.username === username && renderNavButton('Edit Image')}
      </div>
    </div>
  );
};

UserNav.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserNav;