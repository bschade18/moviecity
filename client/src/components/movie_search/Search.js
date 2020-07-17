import React, { useState } from 'react';
import {
  imageUrl,
  posterSize,
  popularBaseUrl,
  searchBaseUrl,
} from '../../config';

import Grid from '../movie/Grid';
import LoadMoreBtn from './LoadMoreBtn';
import MovieThumb from '../elements/MovieThumb';
import SearchBar from './SearchBar';
import Spinner from '../layout/Spinner';
import Navigation from '../layout/Navigation';
import { useHomeFetch } from '../hooks/useHomeFetch';
import NoImage from '../../img/no_image.jpg';

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

  return (
    <div>
      <Navigation page="Search" />
      <SearchBar callback={searchMovies} />
      <Grid header={search ? 'Search Results' : 'Popular Movies'}>
        {!movies[0] && (
          <div>
            No movies were found in your search. Try another search. Merry
            Christmas, ya filthy animal.
          </div>
        )}
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
