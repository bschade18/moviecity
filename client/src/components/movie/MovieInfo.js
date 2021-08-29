import '../../styles/MovieInfo.css';
import React, { useState, useEffect } from 'react';
import ReviewModal from './ReviewModal';
import MessageModal from './MessageModal';
import MovieThumb from '../elements/MovieThumb';
import NoImage from '../../img/no_image.jpg';
import { setFavorites, setWatchList } from '../../actions/auth';
import { posterSize, imageUrl, backdropSize } from '../../config';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const MovieInfo = ({ movie, user, setFavorites, setWatchList, history }) => {
  const [favorite, setFavorite] = useState(false);
  const [toWatch, setToWatch] = useState(false);
  const {
    backdrop_path,
    poster_path,
    title,
    overview,
    vote_average,
    directors,
    release_date,
  } = movie;

  useEffect(() => {
    for (var i = 0; i < user.favorites.length; i++) {
      if (user.favorites[i].title === title) {
        setFavorite(true);
        return;
      } else {
        setFavorite(false);
      }
    }
  }, [user.favorites, title]);

  useEffect(() => {
    for (var i = 0; i < user.watchList.length; i++) {
      if (user.watchList[i].title === title) {
        setToWatch(true);
        return;
      } else {
        setToWatch(false);
      }
    }
  }, [user.watchList, title]);

  const movieInfoStyle = (backdrop) => ({
    background: backdrop_path
      ? `url(${imageUrl}${backdropSize}${backdrop})`
      : '#000',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    padding: '40px 20px',
    boxSizing: 'border-box',
    animation: 'animateMovieinfo 1s',
  });

  const setFav = () => {
    let updateUser;

    if (favorite) {
      setFavorite(false);

      updateUser = {
        favorites: [...user.favorites.filter((movie) => movie.title !== title)],
      };
    } else {
      setFavorite(true);

      updateUser = {
        favorites: [
          ...user.favorites,
          { title, imgUrl: `${imageUrl}w185${poster_path}`, movieId: movie.id },
        ],
      };
    }

    setFavorites(user._id, updateUser);
  };

  const setToWatchlist = () => {
    let updateUser;

    if (toWatch) {
      setToWatch(false);
      updateUser = {
        watchList: [...user.watchList.filter((movie) => movie.title !== title)],
      };
    } else {
      setToWatch(true);
      updateUser = {
        watchList: [
          ...user.watchList,
          { title, imgUrl: `${imageUrl}w185${poster_path}`, movieId: movie.id },
        ],
      };
    }

    setWatchList(user._id, updateUser);
  };

  return (
    <div className="movieinfo" style={movieInfoStyle(backdrop_path)}>
      <div className="movieinfo-content">
        <div className="movieinfo-thumb">
          <MovieThumb
            image={
              poster_path ? `${imageUrl}${posterSize}${poster_path}` : NoImage
            }
            clickable={false}
          />
        </div>
        <div className="movieinfo-text">
          <h1>
            {title} ({release_date.substring(0, 4)})
          </h1>
          <div className="movieinfo-users-lists">
            <span
              className={favorite ? 'fa fa-star checked' : 'fa fa-star gold'}
              onClick={() => setFav()}
            ></span>
            <span>{favorite ? ' Favorite!!' : ' Favorite'}</span>
            <span className="movieinfo-watchlist">
              <span
                className={toWatch ? 'fa fa-plus checked' : 'fa fa-plus gold'}
                onClick={() => setToWatchlist()}
              ></span>
              <span>{toWatch ? ' On WatchList!' : ' WatchList'}</span>
            </span>
          </div>

          <div className="movieinfo-plot">
            <p>{overview}</p>
          </div>

          <div className="movieinfo-rating-director">
            <div>
              <h3>IMDB Rating</h3>
              <div className="movieinfo-score">{vote_average}</div>
            </div>
            <div className="movieinfo-director">
              <h3>Director{directors.length > 1 ? 's' : ''}</h3>
              <div className="movieinfo-director-list">
                {directors.map((element) => (
                  <p key={element.credit_id}>{element.name}</p>
                ))}
              </div>
            </div>
          </div>
          <div className="movieinfo-review-btns">
            <div className="movieinfo-review-btn">
              <ReviewModal movie={movie} user={user} history={history} />
            </div>
            <div className="movieinfo-review-btn">
              <MessageModal movie={movie} user={user} history={history} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

MovieInfo.propTypes = {
  movie: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  setFavorites: PropTypes.func.isRequired,
  setWatchList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { setFavorites, setWatchList })(
  MovieInfo
);
