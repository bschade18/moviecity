import React from 'react';

import Actor from '../elements/Actor';
import Grid from '../elements/Grid';
import MovieInfo from '../elements/MovieInfo';
import MovieInfoBar from '../elements/MovieInfoBar';
import Navigation from '../elements/Navigation';
import Spinner from '../elements/Spinner';

import { useMovieFetch } from './hooks/useMovieFetch';

const Movie = ({ match, user }) => {
  const [movie, loading, error] = useMovieFetch(match.params.movieId);

  if (error) return <div>Something went wrong...</div>;
  if (loading) return <Spinner />;

  return (
    <div>
      <Navigation movie={movie.original_title} />
      <MovieInfo movie={movie} user={user} />
      {/* <MovieInfoBar
        runtime={movie.runtime}
        budget={movie.budget}
        boxoffice={movie.revenue}
      /> */}
      <Grid header="Cast">
        {movie.actors.map((actor) => (
          <Actor key={actor.credit_id} actor={actor} />
        ))}
      </Grid>
    </div>
  );
};

export default Movie;
