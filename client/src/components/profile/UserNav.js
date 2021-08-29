import '../../styles/UserNav.css';
import React from 'react';
import PropTypes from 'prop-types';

const UserNav = ({
  user,
  users,
  username,
  renderNavButton,
  toggleFriend,
  profileUserId,
  followers,
  following,
  setView,
}) => {
  return (
    <div className="feed-header">
      <div className="feed-header-heading">
        <img
          className="user-nav-user-avatar"
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
            'btn ml-3 btn-pill  ' +
            (user._id === profileUserId ? 'd-none ' : 'd-block btn-success ') +
            (user.friends.filter((friend) => friend._id === profileUserId)
              .length
              ? 'friend-btn'
              : 'friend-btn-hide')
          }
          onClick={() => toggleFriend()}
        >
          <span>
            {' '}
            {user.friends.filter((friend) => friend._id === profileUserId)
              .length
              ? ''
              : 'Add Friend'}
          </span>
        </button>
      </div>
      <div className="feed-header-follow">
        <button onClick={() => setView('Following')}>
          <span>{following.length}</span>
          <span>Following</span>
        </button>

        <button onClick={() => setView('Followers')}>
          <span>{followers.length}</span>
          <span>Followers</span>
        </button>
      </div>

      <div className="user-nav mt-xs-2">
        {renderNavButton('Reviews')}
        {renderNavButton('Favorites')}
        {renderNavButton('Watchlist')}
        {user._id === profileUserId && renderNavButton('Edit Profile')}
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
  followers: PropTypes.array.isRequired,
  following: PropTypes.array.isRequired,
};

export default UserNav;
