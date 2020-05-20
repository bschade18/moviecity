import React from 'react';

import Actor from '../../elements/Actor';
import Grid from '../../elements/Grid';
import MovieInfo from '../../elements/MovieInfo';
import Navigation from '../../elements/Navigation';
import Spinner from '../../elements/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { useMovieFetch } from '../hooks/useMovieFetch';

const Movie = ({ match, user }) => {
  const [movie, loading, error] = useMovieFetch(match.params.movieId);

  if (error) return <div>Something went wrong...</div>;
  if (loading) return <Spinner />;

  return (
    <div>
      <Navigation movie={movie.original_title} />
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
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Movie);