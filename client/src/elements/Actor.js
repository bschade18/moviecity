import React from 'react';
import { imageUrl, posterSize } from '../config';

import NoImage from '../components/images/no_image.jpg';

const Actor = ({ actor: { name, character, profile_path } }) => (
  <div className="actor-container">
    <img
      className="actor-image"
      src={profile_path ? `${imageUrl}${posterSize}${profile_path}` : NoImage}
      alt="actorthumb"
    />
    <span className="actor-name">{name}</span>
    <span className="actor-character">{character}</span>
  </div>
);

export default Actor;
