import React from 'react';
import { imageUrl, posterSize } from '../../config';
import NoImage from '../../img/no_image.jpg';


interface ActorProps {
  actor: {
    name: string,
    character: string,
    profile_path: string
  }
}

const Actor = ({ actor: { name, character, profile_path } } : ActorProps) => (
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



export default Actor;
