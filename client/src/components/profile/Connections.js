import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import NoResults from '../elements/NoResults';
import NoResultsImageFollowers from '../../img/pineapple.jpg';
import NoResultsImageFollowing from '../../img/superbad.jpg';

const Connections = ({
  connections,
  setView,
  userId,
  profileUserId,
  username,
  view,
}) => {
  const displayConnections = (img, text) => {
    if (!connections.length) {
      return <NoResults image={img} text1={text} />;
    } else {
      return connections.map(({ _id, username, photo }) => (
        <div key={_id} className="connections">
          <img
            className="user-nav-user-avatar"
            src={`/uploads/${photo}`}
            alt="user"
          />
          <Link
            onClick={() => setView('Reviews')}
            className="connections-user-link"
            to={`/${username}`}
          >
            <div className="connections-username">{username}</div>
          </Link>
        </div>
      ));
    }
  };

  return (
    <>
      {displayConnections(
        view === 'following'
          ? NoResultsImageFollowing
          : NoResultsImageFollowers,

        view === 'following'
          ? userId === profileUserId
            ? 'You are not following anyone'
            : `${username} is not following anyone`
          : userId === profileUserId
          ? "You don't have any followers"
          : `${username} does not have any followers`
      )}
    </>
  );
};

export default Connections;

Connections.propTypes = {
  connections: PropTypes.array.isRequired,
  setView: PropTypes.func.isRequired,
};
