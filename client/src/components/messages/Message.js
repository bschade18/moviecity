import React from 'react';

const Message = ({
  message: { sender, imageUrl, movieTitle, conversation, _id },
  toggleConvo,
}) => {
  console.log(conversation);
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
      <td className="movie-table-message">{conversation[0].message}</td>
    </tr>
  );
};

export default Message;
