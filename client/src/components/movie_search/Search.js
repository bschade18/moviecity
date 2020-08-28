import React, { useState, Fragment } from 'react';
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
import FeedHeader from '../layout/FeedHeader';
import AppGrid from '../layout/AppGrid';
import Feed from '../layout/Feed';
import NoResults from '../elements/NoResults';
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
    <AppGrid component="search">
      <Feed>
        <FeedHeader heading="Movie Search" />
        <SearchBar callback={searchMovies} />
        <Grid header={search ? 'Search Results' : 'Popular Movies'}>
          {movies.map((movie) => (
            <MovieThumb
              key={movie.id}
              clickable={true}
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
        {search && !movies[0] && (
          <NoResults
            image="https://www.cinelinx.com/wp-content/uploads/2014/02/k2_items_cache_ce28ed525020bb6b16983cbb33e9862d_XL.jpg"
            text1="You can't bench press your way out of this one"
            text2="No movies were found in your search. Try again."
          />
        )}
        {loading && <Spinner />}
        {currentPage < totalPages && !loading && (
          <LoadMoreBtn text="Load More" callback={loadMoreMovies} />
        )}
      </Feed>
    </AppGrid>
  );
};
export default Search;
