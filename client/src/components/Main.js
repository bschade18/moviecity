import React, { useState, useEffect } from 'react';
import FontAwesome from 'react-fontawesome';
import axios from 'axios';
import MyMovies from '../elements/MyMovies';

import Sidenav from '../elements/Sidenav';

const Main = ({ logout }) => {
  const [myMovies, setmyMovies] = useState([]);

  useEffect(() => {
    axios
      .get('/review')
      .then(res => setmyMovies(res.data))
      .catch(err => console.log(err));
  });

  return (
    <div>
      <div className="main-content">
        <Sidenav logout={logout} />
        <div className="scroll-container">
          <div className="main">
            <div className="scroll-nav">
              <p>Movie</p>
              <FontAwesome className="fas fa-building" name="city" size="2x" />
              <p>City</p>
            </div>
            <div className="movie-scroll">
              {myMovies.map(movie => (
                <MyMovies movie={movie} key={movie._id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
