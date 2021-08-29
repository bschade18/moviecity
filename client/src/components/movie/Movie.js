import '../../styles/Movie.css';
import React, { Fragment } from 'react';
import Actor from './Actor';
import Grid from './Grid';
import MovieInfo from './MovieInfo';
import FeedHeader from '../layout/FeedHeader';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import AppGrid from '../layout/AppGrid';
import Feed from '../layout/Feed';
import MovieInfoPanel from './MovieInfoPanel';
import { youtubeUrl } from '../../config';
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
            <MovieInfoPanel movie={movie} />
            <div className="movie-videos">
              <h1>Trailers & Clips</h1>
              <div className="movie-videos-container">
                {movie.videos.map((video) => (
                  <div className="m-3">
                    <p className="movie-videos-title">{video.name}</p>
                    <iframe
                      className="movie-video-dimensions"
                      title={video.name}
                      src={`${youtubeUrl}${video.key}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                ))}
              </div>
            </div>
            <div className="search-grid">
              <Grid header="Cast" loading={loading}>
                {movie.actors.map((actor) => (
                  <Actor key={actor.credit_id} actor={actor} />
                ))}
              </Grid>
            </div>
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
