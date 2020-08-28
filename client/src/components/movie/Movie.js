import React, { Fragment } from 'react';
import Actor from './Actor';
import Grid from './Grid';
import MovieInfo from './MovieInfo';
import Sidenav from '../layout/Sidenav';
import FeedHeader from '../layout/FeedHeader';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import MobileNav from '../layout/MobileNav';
import { connect } from 'react-redux';

import { useMovieFetch } from '../hooks/useMovieFetch';

const Movie = ({ match, user }) => {
  const [movie, loading, error] = useMovieFetch(match.params.movieId);

  if (error) return <div>Something went wrong...</div>;

  return (
    <div className="search-display-container">
      <Sidenav />
      <div className="ReviewFeed-main">
        <FeedHeader heading="Movie" />

        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <MovieInfo movie={movie} user={user} loading={loading} />
            <Grid header="Cast" loading={loading}>
              {movie.actors.map((actor) => (
                <Actor key={actor.credit_id} actor={actor} />
              ))}
            </Grid>
          </Fragment>
        )}
      </div>
      <MobileNav />
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
