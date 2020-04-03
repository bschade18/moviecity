import React from "react";
import { imageUrl, posterSize } from "../config";

import NoImage from "../components/images/no_image.jpg";

const Actor = ({ actor }) => (
  <div className="actor-container">
    <img
      className="actor-image"
      src={
        actor.profile_path
          ? `${imageUrl}${posterSize}${actor.profile_path}`
          : NoImage
      }
      alt="actorthumb"
    />
    <span className="actor-name">{actor.name}</span>
    <span className="actor-character">{actor.character}</span>
  </div>
);

export default Actor;
