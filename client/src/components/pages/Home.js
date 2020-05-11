import React from 'react';
import { imageUrl, backdropSize, popularBaseUrl } from '../../config';

import Showcase from '../../elements/Showcase';
import Spinner from '../../elements/Spinner';
import Navbar from '../Navbar';

import { useHomeFetch } from '../hooks/useHomeFetch';

const Home = ({ authSuccess, isAuthenticated, logout, user }) => {
  const [
    {
      state: { movies, currentPage, heroImage },
      error,
    },
    fetchMovies,
  ] = useHomeFetch();

  const loadMoreMovies = () => {
    const popularEndpoint = `${popularBaseUrl}&page=${currentPage + 1}`;

    const endpoint = popularEndpoint;

    fetchMovies(endpoint);
  };

  if (error) return <div>Something went wrong</div>;
  if (!movies[0]) return <Spinner />;

  return (
    <div>
      <Navbar
        authSuccess={authSuccess}
        isAuthenticated={isAuthenticated}
        logout={logout}
        user={user}
      />
      <Showcase
        image={`${imageUrl}${backdropSize}${heroImage.backdrop_path}`}
        title={heroImage.original_title}
      />
    </div>
  );
};

export default Home;
