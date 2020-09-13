import React, { Fragment } from 'react';
import Actor from './Actor';
import Grid from './Grid';
import MovieInfo from './MovieInfo';
import FeedHeader from '../layout/FeedHeader';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import AppGrid from '../layout/AppGrid';
import Feed from '../layout/Feed';
import { connect } from 'react-redux';

import { useMovieFetch } from '../hooks/useMovieFetch';

const Movie = ({ match, user, history }) => {
  const [movie, loading, error] = useMovieFetch(match.params.movieId);

  if (error) return <div>Something went wrong...</div>;

  return (
    <AppGrid component="search">
      <Feed>
        <FeedHeader heading="Movie" />

        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <MovieInfo
              movie={movie}
              user={user}
              loading={loading}
              history={history}
            />
            <Grid header="Cast" loading={loading}>
              {movie.actors.map((actor) => (
                <Actor key={actor.credit_id} actor={actor} />
              ))}
            </Grid>
          </Fragment>
        )}
      </Feed>
    </AppGrid>
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
