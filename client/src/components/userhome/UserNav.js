import React from 'react';
import PropTypes from 'prop-types';

const UserNav = ({
  user,
  users,
  username,
  renderNavButton,
  toggleFriend,
  userId,
}) => {
  return (
    <div className="feed-header">
      <div className="feed-header-heading">
        <img
          className="user-avatar"
          src={
            users.filter((user) => user.username === username)[0].photo
              ? `/uploads/${
                  users.filter((user) => user.username === username)[0].photo
                }`
              : `/uploads/no-photo.jpg`
          }
          alt="user"
        />
        <p>{users.filter((user) => user.username === username)[0].name}</p>
        <button
          className={
            'btn ml-3  ' +
            (user._id === userId ? 'd-none ' : 'd-block btn-success ') +
            (user.friends.filter((friend) => friend._id === userId).length
              ? 'friend-btn'
              : 'friend-btn-hide')
          }
          onClick={() => toggleFriend()}
        >
          <span>
            {' '}
            {user.friends.filter((friend) => friend._id === userId).length
              ? ''
              : 'Add Friend'}
          </span>
        </button>
      </div>

      <div className="user-nav mt-3">
        {renderNavButton('Reviews')}
        {renderNavButton('Favorites')}
        {renderNavButton('Watchlist')}
        <div>{user._id === userId && renderNavButton('Edit Profile')}</div>
      </div>
    </div>
  );
};

UserNav.propTypes = {
  user: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
  renderNavButton: PropTypes.func.isRequired,
  toggleFriend: PropTypes.func.isRequired,
};

export default UserNav;
