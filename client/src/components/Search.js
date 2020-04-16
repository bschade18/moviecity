import React, { useState } from 'react';
import { imageUrl, posterSize, popularBaseUrl, searchBaseUrl } from '../config';

import Grid from '../elements/Grid';
import LoadMoreBtn from '../elements/LoadMoreBtn';
import MovieThumb from '../elements/MovieThumb';
import SearchBar from '../elements/SearchBar';
import Spinner from '../elements/Spinner';

import Navigation from '../elements/Navigation';

import { useHomeFetch } from './hooks/useHomeFetch';
import NoImage from './images/no_image.jpg';

const Search = () => {
  const [
    {
      state: { movies, currentPage, totalPages },
      loading,
      error,
    },
    fetchMovies,
  ] = useHomeFetch();
  const [search, setSearch] = useState('');

  const searchMovies = (search) => {
    const endpoint = search ? searchBaseUrl + search : popularBaseUrl;

    setSearch(search);
    fetchMovies(endpoint);
  };
  const loadMoreMovies = () => {
    const searchEndpoint = `${searchBaseUrl}${search}&page=${currentPage + 1}`;

    const popularEndpoint = `${popularBaseUrl}&page=${currentPage + 1}`;

    const endpoint = search ? searchEndpoint : popularEndpoint;

    fetchMovies(endpoint);
  };
  if (error) return <div>Something went wrong</div>;
  if (!movies[0]) return <Spinner />;
  return (
    <div>
      <Navigation />
      <SearchBar callback={searchMovies} />
      <Grid header={search ? 'Search Results' : 'Popular Movies'}>
        {movies.map((movie) => (
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
      )}
    </div>
  );
};
export default Search;
