import React, { useState, useEffect } from 'react';
import FontAwesome from 'react-fontawesome';
import axios from 'axios';
import MyMovies from '../../elements/MyMovies';
import Spinner from '../../elements/Spinner';
import Sidenav from '../../elements/Sidenav';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadUser } from '../../actions/auth';

const UserHome = ({ match, user, loadUser }) => {
  const [myMovies, setmyMovies] = useState([]);

  useEffect(() => {
    axios
      .get('/reviews')
      .then((res) => setmyMovies(res.data.data))
      .catch((err) => console.log(err));
  });

  const addFriend = (e) => {
    e.preventDefault();

    const updateUser = {
      friends: [...user.friends, match.params.user],
    };

    axios
      .put(`/users/${user._id}`, updateUser)
      .then(() => loadUser())
      .catch((err) => console.log(err));
  };

  if (!myMovies[0]) {
    return <Spinner />;
  }
  return (
    <div>
      <div className="main-content">
        <Sidenav />
        <div className="scroll-container">
          <div className="main">
            <div className="scroll-nav">
              <FontAwesome className="fas fa-building" name="city" size="2x" />
              <p>{match.params.user}</p>
              <div>
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
            </div>
            <div className="movie-scroll">
              {myMovies
                .filter((movie) => movie.user === match.params.user)
                .map((movie) => (
                  <MyMovies movie={movie} key={movie._id} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

UserHome.propTypes = {
  user: PropTypes.object,
  loadUser: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { loadUser })(UserHome);
