import React, { useState, useEffect } from 'react';
import FontAwesome from 'react-fontawesome';
import axios from 'axios';
import MyMovies from '../elements/MyMovies';

import Sidenav from '../elements/Sidenav';

const Main = ({ authSuccess, isAuthenticated, logout, user }) => {
  // const [
  //   {
  //     state: { movies, currentPage, totalPages },
  //     loading,
  //     error
  //   },
  //   fetchMovies
  // ] = useHomeFetch();
  // const [search, setSearch] = useState("");
  const [myMovies, setmyMovies] = useState([]);

  // const searchMovies = search => {
  //   const endpoint = search ? searchBaseUrl + search : popularBaseUrl;

  //   setSearch(search);
  //   fetchMovies(endpoint);
  // };
  // const loadMoreMovies = () => {
  //   const searchEndpoint = `${searchBaseUrl}${search}&page=${currentPage + 1}`;

  //   const popularEndpoint = `${popularBaseUrl}&page=${currentPage + 1}`;

  //   const endpoint = search ? searchEndpoint : popularEndpoint;

  //   fetchMovies(endpoint);
  // };

  useEffect(() => {
    axios
      .get('/review')
      .then(res => setmyMovies(res.data))
      .catch(err => console.log(err));
  });

  // if (error) return <div>Something went wrong</div>;
  // if (!movies[0]) return <Spinner />;

  return (
    <div>
      <div className="main-content">
        <Sidenav logout={logout} />
        <div className="scroll-container">
          <div className="main">
            <div className="scroll-nav">
              Movie {''}
              <FontAwesome className="fas fa-building" name="city" size="2x" />
              {''}City
            </div>
            <div className="movie-scroll">
              {myMovies.map(movie => (
                <MyMovies movie={movie} key={movie._id} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* <SearchBar callback={searchMovies} />
      <Grid header={search ? "Search Results" : "Popular Movies"}>
        {movies.map(movie => (
          <MovieThumb
            key={movie.id}
            clickable
            movieTitle={movie.original_title}
            image={
              movie.poster_path
                ? `${imageUrl}${posterSize}${movie.poster_path}`
                : NoImage
            }
            id={movie.id}
          />
        ))}
      </Grid>

      {loading && <Spinner />}
      {currentPage < totalPages && !loading && (
        <LoadMoreBtn text="Load More" callback={loadMoreMovies} />
      )} */}
    </div>
  );
};

export default Main;
