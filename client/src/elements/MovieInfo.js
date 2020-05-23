import React from 'react';
import ReviewModal from './ReviewModal';
import MessageModal from './MessageModal';
import axios from 'axios';

import NoImage from '../components/images/no_image.jpg';
import { posterSize, imageUrl, backdropSize } from '../config';
import MovieThumb from '../elements/MovieThumb';

const MovieInfo = ({ movie, user }) => {
  const {
    backdrop_path,
    poster_path,
    title,
    overview,
    vote_average,
    directors,
  } = movie;

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

  const addFavorite = (e) => {
    // e.preventDefault();

    const updateUser = {
      favorites: [
        ...user.favorites,
        { title, imgUrl: `${imageUrl}w185${poster_path}` },
      ],
    };

    axios
      .put(`/users/${user._id}`, updateUser)
      .then(() => console.log('user updated!'))
      .catch((err) => console.log(err));
  };

  const addToWatch = (e) => {
    // e.preventDefault();

    const updateUser = {
      watchList: [
        ...user.watchList,
        { title, imgUrl: `${imageUrl}w185${poster_path}` },
      ],
    };

    console.log(updateUser);

    axios
      .put(`/users/${user._id}`, updateUser)
      .then(() => console.log('user updated!'))
      .catch((err) => console.log(err));
  };
  // const renderStar = (number) => (
  //   <span
  //     onClick={() => setStar(number)}
  //     className={review === number ? 'fa fa-star checked' : 'fa fa-star hover'}
  //   ></span>
  // );
  return (
    <div className="movieinfo-container" style={movieInfoStyle(backdrop_path)}>
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
          <h1>{title}</h1>
          <span
            className="fa fa-star checked"
            onClick={() => addFavorite()}
          ></span>
          <span> Add as Favorite</span>
          <div>
            <i className="fa fa-plus"></i>
            <span onClick={() => addToWatch()}> Add to Watch List</span>
          </div>
          <h3>Plot</h3>
          <p>{overview}</p>

          <div className="rating-director">
            <div>
              <h3>IMDB Rating</h3>
              <div className="score">{vote_average}</div>
            </div>
            <div className="director">
              <h3>Director{directors.length > 1 ? 's' : ''}</h3>
              {directors.map((element) => (
                <p key={element.credit_id}>{element.name}</p>
              ))}
            </div>
          </div>
          <div className="movieinfo-review-btns">
            <div className="movieinfo-review-btn">
              <ReviewModal movie={movie} user={user} />
            </div>
            <div className="movieinfo-review-btn">
              <MessageModal movie={movie} user={user} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
