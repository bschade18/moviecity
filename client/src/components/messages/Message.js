import React from 'react';
import PropTypes from 'prop-types';

const Message = ({
  message: { sender, imageUrl, movieTitle, conversation, _id, recipient },
  toggleConvo,
  user,
}) => (
  <tr
    onClick={() =>
      toggleConvo({
        sender,
        imageUrl,
        movieTitle,
        conversation,
        _id,
        recipient,
      })
    }
  >
    <td className="message-poster-row">
      <img
        className="movie-poster-list-img"
        src={imageUrl}
        alt="movie poster"
      />
    </td>

    <td className="left-text message-content-row">
      {movieTitle}{' '}
      <div>
        {user.username === sender ? `with: ${recipient}` : `with: ${sender}`}
      </div>
    </td>
  </tr>
);

Message.propTypes = {
  message: PropTypes.object.isRequired,
  toggleConvo: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default Message;
