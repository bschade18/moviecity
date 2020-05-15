import React, { useState, useEffect } from 'react';
import FontAwesome from 'react-fontawesome';
import axios from 'axios';
import MyMovies from '../../elements/MyMovies';
import Spinner from '../../elements/Spinner';
import Sidenav from '../../elements/Sidenav';

const UserHome = ({ logout, match }) => {
  const [myMovies, setmyMovies] = useState([]);

  useEffect(() => {
    axios
      .get('/reviews')
      .then((res) => setmyMovies(res.data.data))
      .catch((err) => console.log(err));
  });

  if (!myMovies[0]) {
    return <Spinner />;
  }
  return (
    <div>
      <div className="main-content">
        <Sidenav logout={logout} />
        <div className="scroll-container">
          <div className="main">
            <div className="scroll-nav">
              <FontAwesome className="fas fa-building" name="city" size="2x" />
              <p>{match.params.user}</p>
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

export default UserHome;
