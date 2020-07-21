import React from 'react';

const Message = ({
  message: { sender, imageUrl, movieTitle, conversation, _id },
  toggleConvo,
}) => {
  return (
    <tr
      onClick={() =>
        toggleConvo({ sender, imageUrl, movieTitle, conversation, _id })
      }
    >
      <td>{sender}</td>
      <td>
        <img
          className="movie-poster-list-img"
          src={imageUrl}
          alt="movie poster"
        />
      </td>
      <td>{movieTitle}</td>
      <td className="movie-table-message">{conversation[0].text}</td>
    </tr>
  );
};

export default Message;