const apiUrl = 'https://api.themoviedb.org/3/';
const apiKey = '398491797edd047a83bcbc20bd3311c9';

const searchBaseUrl = `${apiUrl}search/movie?api_key=${apiKey}&query=`;

const popularBaseUrl = `${apiUrl}movie/popular?api_key=${apiKey}`;

const imageUrl = 'https://image.tmdb.org/t/p/';

const backdropSize = 'w1280';
const posterSize = 'w500';

export {
  apiUrl,
  apiKey,
  imageUrl,
  backdropSize,
  posterSize,
  searchBaseUrl,
  popularBaseUrl,
};
