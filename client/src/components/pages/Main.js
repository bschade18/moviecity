import React, { useState, useEffect } from 'react';
import FontAwesome from 'react-fontawesome';
import axios from 'axios';
import MyMovies from '../../elements/MyMovies';
import Spinner from '../../elements/Spinner';
import Sidenav from '../../elements/Sidenav';
import UserSearch from '../../elements/UserSearch';
import { Link } from 'react-router-dom';

const Main = ({ logout }) => {
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
    <div className="main-content">
      <Sidenav logout={logout} />
      <div className="scroll-container">
        <div className="main">
          <div className="scroll-nav">
            <FontAwesome className="fas fa-building" name="city" size="2x" />
            <p>MovieCity</p>
          </div>
          <div className="movie-scroll">
            {myMovies.map((movie) => (
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
    </div>
  );
};

export default Main;
