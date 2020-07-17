import React from 'react';
import Actor from './Actor';
import Grid from './Grid';
import MovieInfo from './MovieInfo';
import Navigation from '../layout/Navigation';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { useMovieFetch } from '../hooks/useMovieFetch';

const Movie = ({ match, user }) => {
  const [movie, loading, error] = useMovieFetch(match.params.movieId);

  if (error) return <div>Something went wrong...</div>;
  if (loading) return <Spinner />;

  return (
    <div>
      <Navigation page={movie.original_title} />
      <MovieInfo movie={movie} user={user} />

      <Grid header="Cast">
        {movie.actors.map((actor) => (
          <Actor key={actor.credit_id} actor={actor} />
        ))}
      </Grid>
    </div>
  );
};

Movie.propTypes = {
  user: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Movie);
