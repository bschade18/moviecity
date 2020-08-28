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

  const displayUserList = (userList) =>
    users
      .filter((user) => {
        return username === user.username;
      })[0]
      [userList].map((movie) => <UserList movie={movie} key={movie._id} />);

  const displayUserReviews = () =>
    reviews
      .filter((review) => {
        return username === review.username;
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
          username={username}
          renderNavButton={renderNavButton}
          toggleFriend={toggleFriend}
        />
        {view === 'Reviews' && displayUserReviews()}
        {view === 'Favorites' && displayUserList('favorites')}
        {view === 'Watchlist' && displayUserList('watchList')}
        {view === 'Edit Image' && <UserProfile />}
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
