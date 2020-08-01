import React, { useState, useEffect, Fragment } from 'react';
import ReviewItem from '../home/ReviewItem';
import Spinner from '../layout/Spinner';
import Sidenav from '../layout/Sidenav';
import UserSearch from '../elements/UserSearch';
import UserList from './UserList';
import UserProfile from '../userprofile/UserProfile';
import MobileNav from '../layout/MobileNav';
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
    <Fragment>
      <Sidenav />
      <div className="display-container">
        <div className="ReviewFeed-main">
          <div className="scroll-nav">
            <div className="scroll-heading">
              <img
                className="user-photo"
                src={
                  users.filter((user) => user.username === username)[0].photo
                    ? `/uploads/${
                        users.filter((user) => user.username === username)[0]
                          .photo
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
                  (user.username === username
                    ? 'd-none '
                    : 'd-block btn-success ') +
                  (user.friends.includes(username)
                    ? 'friend-btn'
                    : 'friend-btn-hide')
                }
                onClick={() => toggleFriend()}
              >
                <span>
                  {' '}
                  {user.friends.includes(username) ? '' : 'Add Friend'}
                </span>
              </button>
            </div>
            <div className="user-nav mt-3">
              {renderNavButton('Reviews')}
              {renderNavButton('Favorites')}
              {renderNavButton('Watchlist')}
              {user.username === username && renderNavButton('Edit Image')}
            </div>
          </div>
          <div className="movie-scroll">
            {view === 'Reviews' &&
              reviews
                .filter((review) => {
                  return username === review.username;
                })
                .map((review) => (
                  <ReviewItem review={review} key={review._id} />
                ))}
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
          <MobileNav />
        </div>
      </div>
      <UserSearch />
    </Fragment>
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
