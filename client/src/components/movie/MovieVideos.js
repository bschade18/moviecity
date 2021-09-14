import React from 'react';
import { youtubeUrl } from '../../config';

const MovieVideos = ({ videos }) => (
  <div className="movie-videos">
    <h1>Trailers & Clips</h1>
    <div className="movie-videos-container">
      {videos.map((video) => (
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
);

export default MovieVideos;
