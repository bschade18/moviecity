import React, { useState, useEffect } from 'react';
import FontAwesome from 'react-fontawesome';
import axios from 'axios';
import MyMovies from '../../elements/MyMovies';
import Spinner from '../../elements/Spinner';
import Sidenav from '../../elements/Sidenav';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadUser, logout } from '../../actions/auth';
import UserSearch from '../../elements/UserSearch';

const UserHome = ({ match, user, loadUser }) => {
  const [myMovies, setmyMovies] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let isSubscribed = true;

    axios
      .get('/reviews')
      .then((res) => {
        if (isSubscribed) setmyMovies(res.data.data);
      })
      .catch((err) => console.log(err));

    return () => (isSubscribed = false);
  }, []);

  useEffect(() => {
    let isSubscribed = true;

    axios
      .get(`/users`)
      .then((res) => {
        if (isSubscribed) setUsers(res.data);
      })
      .catch((err) => console.log(err));

    return () => (isSubscribed = false);
  }, []);

  const addFriend = () => {
    const updateUser = {
      friends: [...user.friends, match.params.user],
    };

    axios
      .put(`/users/${user._id}`, updateUser)
      .then(() => loadUser())
      .catch((err) => console.log(err));
  };

  if (!myMovies[0] || !users[0]) {
    return <Spinner />;
  }
  return (
    <div className="main-content">
      <Sidenav />
      <div className="scroll-container">
        <div className="main">
          <div className="scroll-nav">
            <FontAwesome className="fas fa-building" name="city" size="2x" />
            <p>{match.params.user}</p>
            <button
              data-hover="Remove Friend"
              className={
                'friend-btn btn btn-success ml-3 ' +
                (user.name === match.params.user ? 'd-none' : 'd-block')
              }
              onClick={(e) => addFriend(e)}
            >
              {user.friends.includes(match.params.user)
                ? 'Friends'
                : 'Add Friend'}
            </button>
          </div>
          <div className="movie-scroll">
            {myMovies
              .filter((movie) => {
                return match.params.user === movie.user;
              })
              .map((movie) => (
                <MyMovies movie={movie} key={movie._id} />
              ))}
          </div>
          <div className="bottom-nav">
            <Link to="/main" className="btn">
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
      <div className="user-favorites">
        <div>Favorites</div>
        {users
          .filter((user) => {
            return match.params.user === user.name;
          })[0]
          .favorites.map((fav) => {
            return (
              <img id="fav-img" src={fav.imgUrl} alt="movie" key={fav._id} />
            );
          })}
      </div>

      <div className="user-watchlist">
        <div>Watch List</div>
        {users
          .filter((user) => {
            return match.params.user === user.name;
          })[0]
          .watchList.map((movie) => {
            return (
              <img
                id="fav-img"
                src={movie.imgUrl}
                alt="movie"
                key={movie._id}
              />
            );
          })}
      </div>
    </div>
  );
};

UserHome.propTypes = {
  user: PropTypes.object,
  loadUser: PropTypes.func,
  logout: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { loadUser, logout })(UserHome);
