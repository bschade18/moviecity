import React, { useState, useEffect } from 'react';
import ReviewItem from '../home/ReviewItem';
import Spinner from '../layout/Spinner';
import UserList from './UserList';
import UserProfile from '../userprofile/UserProfile';
import UserNav from './UserNav';
import AppGrid from '../layout/AppGrid';
import Feed from '../layout/Feed';
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
  }, [getReviews, getUsers, user.name]);

  const { username } = match.params;

  const getUserPage = () => {
    const user = users.filter((user) => user.username === username);
    return user[0]._id;
  };

  const toggleFriend = () => {
    let userPageId = getUserPage();

    let updatedUser;

    const userFriends = user.friends;

    if (userFriends.filter((friend) => friend._id === userPageId).length) {
      updatedUser = {
        friends: [
          ...user.friends.filter((friend) => friend._id !== userPageId),
        ],
      };
    } else {
      updatedUser = {
        friends: [...user.friends, userPageId],
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

  const displayUserList = (userList) =>
    users
      .filter((user) => {
        return user._id === getUserPage();
      })[0]
      [userList].map((movie) => <UserList movie={movie} key={movie._id} />);

  const displayUserReviews = () =>
    reviews
      .filter((review) => {
        return review.user._id === getUserPage();
      })
      .map((review) => <ReviewItem review={review} key={review._id} />);

  if (!reviews[0] || !users[0]) {
    return <Spinner />;
  }

  return (
    <AppGrid>
      <Feed>
        <UserNav
          users={users}
          user={user}
          userId={getUserPage()}
          username={username}
          renderNavButton={renderNavButton}
          toggleFriend={toggleFriend}
        />
        {view === 'Reviews' && displayUserReviews()}
        {view === 'Favorites' && displayUserList('favorites')}
        {view === 'Watchlist' && displayUserList('watchList')}
        {view === 'Edit Profile' && <UserProfile user={user} />}
      </Feed>
    </AppGrid>
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
