import React, { useState, useEffect } from 'react';
import ReviewItem from '../home/ReviewItem';
import Spinner from '../layout/Spinner';
import Sidenav from '../layout/Sidenav';
import UserSearch from '../elements/UserSearch';
import UserList from './UserList';
import UserProfile from '../userprofile/UserProfile';
import MobileNav from '../layout/MobileNav';
import UserNav from './UserNav';
import { updateUserFriends } from '../../actions/auth';
import { logout } from '../../actions/auth';
import { getReviews } from '../../actions/review';
import { getUsers } from '../../actions/users';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const UserHome = ({
  match,
  user,
  reviews,
  getReviews,
  getUsers,
  users,
  updateUserFriends,
}) => {
  const [view, setView] = useState('Reviews');

  useEffect(() => {
    getReviews();
    getUsers();
  }, [getReviews, getUsers]);

  const { username } = match.params;

  const toggleFriend = () => {
    let updatedUser;

    if (user.friends.includes(username)) {
      updatedUser = {
        friends: [...user.friends.filter((friend) => friend !== username)],
      };
    } else {
      updatedUser = {
        friends: [...user.friends, username],
      };
    }

    updateUserFriends(updatedUser, user);
  };

  const renderNavButton = (listName) => (
    <div
      onClick={() => setView(listName)}
      className={
        'btn btn-outline-success my-2 mb-md-2 btn-block-sm-only mr-2 ' +
        (view === listName && 'active')
      }
    >
      {listName}
    </div>
  );

  if (!reviews[0] || !users[0]) {
    return <Spinner />;
  }

  return (
    <div className="display-container">
      <Sidenav />
      <div className="ReviewFeed-main">
        <UserNav
          users={users}
          user={user}
          username={username}
          renderNavButton={renderNavButton}
          toggleFriend={toggleFriend}
        />

        {view === 'Reviews' &&
          reviews
            .filter((review) => {
              return username === review.username;
            })
            .map((review) => <ReviewItem review={review} key={review._id} />)}
        {view === 'Favorites' &&
          users
            .filter((user) => {
              return username === user.username;
            })[0]
            .favorites.map((movie) => (
              <UserList movie={movie} key={movie._id} />
            ))}

        {view === 'Watchlist' &&
          users
            .filter((user) => {
              return username === user.username;
            })[0]
            .watchList.map((movie) => (
              <UserList movie={movie} key={movie._id} />
            ))}
        {view === 'Edit Image' && <UserProfile />}
      </div>
      <UserSearch />
      <MobileNav />
    </div>
  );
};

UserHome.propTypes = {
  user: PropTypes.object.isRequired,
  reviews: PropTypes.array.isRequired,
  getReviews: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  updateUserFriends: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  users: state.user.users,
  reviews: state.review.reviews,
});

export default connect(mapStateToProps, {
  getReviews,
  getUsers,
  updateUserFriends,
  logout,
})(UserHome);
