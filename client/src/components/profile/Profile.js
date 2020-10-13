import React, { useState, useEffect } from 'react';
import ReviewItem from '../home/ReviewItem';
import Spinner from '../layout/Spinner';
import UserList from './UserList';
import EditProfile from './EditProfile';
import UserNav from './UserNav';
import AppGrid from '../layout/AppGrid';
import Feed from '../layout/Feed';
import NoResults from '../elements/NoResults';
import NoFavoritesResultsImage from '../../img/bobslicker.jpg';
import NoWatchListResultsImage from '../../img/homealone.png';
import NoReviewsResultsImage from '../../img/liarliar.jpg';
import { updateUserFriends } from '../../actions/auth';
import { logout } from '../../actions/auth';
import { getReviews } from '../../actions/review';
import { getUsers } from '../../actions/users';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Profile = ({
  match,
  user,
  reviews,
  getReviews,
  getUsers,
  users,
  updateUserFriends,
}) => {
  const [view, setView] = useState('Reviews');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  useEffect(() => {
    getReviews();
    getUsers();
  }, [getReviews, getUsers, user.name]);

  const { username } = match.params;

  const profileUserId = () => {
    return users.find((user) => user.username === username)._id;
  };

  const toggleFriend = () => {
    const profileId = profileUserId();
    const { friends } = user;
    let updatedUser;

    if (friends.filter((friend) => friend._id === profileId).length) {
      updatedUser = {
        friends: [...friends.filter((friend) => friend._id !== profileId)],
      };
    } else {
      updatedUser = {
        friends: [...friends, profileId],
      };
    }

    updateUserFriends(updatedUser, user);
  };

  const renderNavButton = (listName) => (
    <div
      onClick={() => setView(listName)}
      className={
        'btn btn-outline-success my-2 mb-md-2 btn-block-sm-only mr-2 ' +
        (view === listName && 'active')
      }
    >
      {listName}
    </div>
  );

  const displayUserList = (userList, text, img) => {
    const list = users.filter((user) => {
      return user._id === profileUserId();
    })[0][userList];

    if (!list.length) {
      return <NoResults image={img} text1={text} />;
    } else {
      return list.map((movie) => <UserList movie={movie} key={movie._id} />);
    }
  };

  const displayUserReviews = (img, text) => {
    const userReviews = reviews.filter((review) => {
      return review.user._id === profileUserId();
    });

    if (!userReviews.length) {
      return <NoResults image={img} text1={text} />;
    } else {
      return userReviews.map((review) => (
        <ReviewItem review={review} key={review._id} />
      ));
    }
  };

  if (!reviews[0] || !users[0]) {
    return <Spinner />;
  }

  return (
    <AppGrid>
      <Feed>
        <UserNav
          users={users}
          user={user}
          profileUserId={profileUserId()}
          username={username}
          renderNavButton={renderNavButton}
          toggleFriend={toggleFriend}
        />
        {view === 'Reviews' &&
          displayUserReviews(
            NoReviewsResultsImage,
            user._id === profileUserId()
              ? 'You have not reviewed any movies'
              : `${username} has not reviewed any movies`
          )}
        {view === 'Favorites' &&
          displayUserList(
            'favorites',
            user._id === profileUserId()
              ? 'You have not added any favorites'
              : `${username} has not added any favorites`,
            NoFavoritesResultsImage
          )}
        {view === 'Watchlist' &&
          displayUserList(
            'watchList',
            user._id === profileUserId()
              ? 'You have not added any movies to your watchlist'
              : `${username} has not added any movies to their watchlist`,
            NoWatchListResultsImage
          )}
        {view === 'Edit Profile' && <EditProfile user={user} />}
      </Feed>
    </AppGrid>
  );
};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  reviews: PropTypes.array.isRequired,
  getReviews: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  updateUserFriends: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  users: state.user.users,
  reviews: state.review.reviews,
});

export default connect(mapStateToProps, {
  getReviews,
  getUsers,
  updateUserFriends,
  logout,
})(Profile);
