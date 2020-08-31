import React from 'react';
import { imageUrl, posterSize } from '../../config';
import NoImage from '../../img/no_image.jpg';
import PropTypes from 'prop-types';

const Actor = ({ actor: { name, character, profile_path } }) => (
  <div className="actor">
    <img
      className="actor-image"
      src={profile_path ? `${imageUrl}${posterSize}${profile_path}` : NoImage}
      alt="actorthumb"
    />
    <span className="actor-name">{name}</span>
    <span className="actor-character">{character}</span>
  </div>
);

Actor.propTypes = {
  actor: PropTypes.object.isRequired,
};

export default Actor;
