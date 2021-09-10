import React from 'react';
import NoResults from '../elements/NoResults';
import NoResultsImage from '../../img/tommy.jpg';
import Message from './Message';

const MessageList = ({ messages, loading, user, toggleChat }) => {
  const userAndFriendsMessages = messages.filter(
    (message) =>
      message.recipient._id === user._id || message.sender._id === user._id
  );
  return (
    <div>
      {!loading && userAndFriendsMessages.length === 0 ? (
        <NoResults
          image={NoResultsImage}
          text1="All because you wanted to save a couple extra pennies..."
          text2="Messages between you and friends will display here"
        />
      ) : (
        userAndFriendsMessages.map((message) => (
          <Message
            toggleChat={(message) => toggleChat(message)}
            message={message}
            key={message._id}
            user={user}
          />
        ))
      )}
    </div>
  );
};

export default MessageList;
