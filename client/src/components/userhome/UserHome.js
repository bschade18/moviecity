import React, { useState, useEffect } from 'react';
import FontAwesome from 'react-fontawesome';
import MyMovies from '../home/MyMovies';
import Spinner from '../layout/Spinner';
import Sidenav from '../layout/Sidenav';
import UserSearch from '../elements/UserSearch';
import Favorites from './Favorites';
import { loadUser, logout, updateUser } from '../../actions/auth';
import { getReviews } from '../../actions/review';
import { getUsers } from '../../actions/users';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const UserHome = ({
  match,
  user,
  reviews,
  getReviews,
  getUsers,
  users,
  updateUser,
}) => {
  const [view, setView] = useState('reviews');

  useEffect(() => {
    getReviews();
    getUsers();
    // eslint-disable-next-line
  }, []);

  const addFriend = () => {
    let updatedUser;
    if (!user.friends.includes(match.params.user)) {
      updatedUser = {
        friends: [...user.friends, match.params.user],
      };
    } else {
      updatedUser = {
        friends: [
          ...user.friends.filter((friend) => friend !== match.params.user),
        ],
      };
    }

    updateUser(updatedUser, user);
  };

  if (!reviews[0] || !users[0]) {
    return <Spinner />;
  }
  return (
    <div className="main-content">
      <Sidenav />
      <div className="scroll-container">
        <div className="main">
          <div className="scroll-nav">
            <div className="scroll-heading">
              <FontAwesome className="fas fa-building" name="city" size="2x" />
              <p>{match.params.user}</p>
              <button
                className={
                  'btn ml-3  ' +
                  (user.name === match.params.user
                    ? 'd-none '
                    : 'd-block btn-success ') +
                  (user.friends.includes(match.params.user)
                    ? 'friend-btn'
                    : 'friend-btn-hide')
                }
                onClick={() => addFriend()}
              >
                <span>
                  {' '}
                  {user.friends.includes(match.params.user) ? '' : 'Add Friend'}
                </span>
              </button>
            </div>
            <div className="user-nav">
              <div
                onClick={() => setView('reviews')}
                className={
                  'btn btn-outline-success my-2 my-sm-0 btn-block-sm-only mr-2 ' +
                  (view === 'reviews' && 'active')
                }
              >
                Reviews
              </div>
              <div
                onClick={() => setView('favorites')}
                className={
                  'btn btn-outline-success my-2 my-sm-0 btn-block-sm-only mr-2 ' +
                  (view === 'favorites' && 'active')
                }
              >
                Favorites
              </div>
              <div
                onClick={() => setView('watchlist')}
                className={
                  'btn btn-outline-success my-2 my-sm-0 btn-block-sm-only ' +
                  (view === 'watchlist' && 'active')
                }
              >
                Watch List
              </div>
            </div>
          </div>
          <div className="movie-scroll">
            {view === 'reviews' &&
              reviews
                .filter((movie) => {
                  return match.params.user === movie.user;
                })
                .map((movie) => <MyMovies movie={movie} key={movie._id} />)}
            {view === 'favorites' &&
              users
                .filter((user) => {
                  return match.params.user === user.name;
                })[0]
                .favorites.map((fav) => (
                  <Favorites movie={fav} key={fav._id} />
                ))}

            {view === 'watchlist' &&
              users
                .filter((user) => {
                  return match.params.user === user.name;
                })[0]
                .watchList.map((movie) => (
                  <Favorites movie={movie} key={movie._id} />
                ))}
          </div>
          <div className="bottom-nav">
            <Link to="/home" className="btn">
              <div className="sn-item">
                <FontAwesome className="fa-home" name="home" size="2x" />
                <span className="d-block">Home</span>
              </div>
            </Link>
            <Link to="/messages" className="btn">
              <div className="sn-item">
                <FontAwesome
                  className="fa-envelope"
                  name="envelope"
                  size="2x"
                />
                <span className="d-block">Inbox</span>
              </div>
            </Link>
            <Link to="/search" className="btn">
              <div className="sn-item">
                <FontAwesome className="fa-search" name="search" size="2x" />
                <span className="d-block">Search</span>
              </div>
            </Link>
            <Link to={`/user/${user.name}`} className="btn">
              <div className="sn-item">
                <FontAwesome className="fa-user" name="search" size="2x" />
                <span className="d-block">Profile</span>
              </div>
            </Link>
            <button className="btn" onClick={logout}>
              <div className="sn-item">
                <FontAwesome className="fa-sign-out" name="singout" size="2x" />
                <span className="d-block">Logout</span>
              </div>
            </button>
          </div>
        </div>
      </div>
      <UserSearch />
    </div>
  );
};

UserHome.propTypes = {
  user: PropTypes.object,
  loadUser: PropTypes.func,
  logout: PropTypes.func,
  reviews: PropTypes.array,
  getReviews: PropTypes.func,
  getUsers: PropTypes.func,
  updateUser: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  reviews: state.review.reviews,
  users: state.user.users,
});

export default connect(mapStateToProps, {
  loadUser,
  logout,
  getReviews,
  getUsers,
  updateUser,
})(UserHome);
