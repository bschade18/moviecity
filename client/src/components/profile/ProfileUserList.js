import React from 'react';
import NoResults from '../elements/NoResults';
import Grid from '../movie/Grid';
import MovieThumb from '../elements/MovieThumb';

const ProfileUserList = ({ users, profileUserId, img, text, userList }) => {
  const list = users.filter((user) => {
    return user._id === profileUserId();
  })[0][userList];

  return (
    <div>
      {!list.length ? (
        <NoResults image={img} text1={text} />
      ) : (
        <Grid component="profile">
          {list.map((movie) => (
            <MovieThumb
              image={movie.imgUrl}
              id={movie.movieId}
              key={movie.movieId}
              clickable={true}
            />
          ))}
        </Grid>
      )}
    </div>
  );
};

export default ProfileUserList;
