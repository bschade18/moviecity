import React, { useState, useEffect } from 'react';
import Spinner from '../layout/Spinner';
import EditProfile from './EditProfile';
import UserNav from './UserNav';
import AppGrid from '../layout/AppGrid';
import Feed from '../layout/Feed';
import ProfileUserReviews from './ProfileUserReviews';
import ProfileUserList from './ProfileUserList';
import NoFavoritesResultsImage from '../../img/bobslicker.jpg';
import NoWatchListResultsImage from '../../img/homealone.jpg';
import NoReviewsResultsImage from '../../img/jim.jpg';
import Connections from './Connections';
import { updateUser } from '../../actions/users';
import { logout } from '../../actions/auth';
import { getReviews } from '../../actions/review';
import { getUsers } from '../../actions/users';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Profile = ({
  match,
  user,
  reviews,
  reviewsLoading,
  getReviews,
  getUsers,
  users,
  updateUser,
}) => {
  const [view, setView] = useState('Reviews');
  const { username } = match.params;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  useEffect(() => {
    getReviews();
    getUsers();
  }, [getReviews, getUsers, user.name]);

  useEffect(() => {
    setView('Reviews');
  }, [username]);

  const profileUserId = () =>
    users.find((user) => user.username === username)._id;

  const profileUserFollowers = () =>
    users.filter((user) => user.friends.some((f) => f._id === profileUserId()));

  const profileUserFollowing = () =>
    users.filter((user) => user._id === profileUserId())[0].friends;

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

    updateUser(user._id, updatedUser);
  };

  if (!reviews[0] || !users[0]) {
    return <Spinner />;
  }

  return (
    <AppGrid component="profile">
      <Feed>
        <UserNav
          users={users}
          user={user}
          profileUserId={profileUserId()}
          username={username}
          toggleFriend={toggleFriend}
          followers={profileUserFollowers()}
          following={profileUserFollowing()}
          view={view}
          setView={setView}
        />
        {reviewsLoading ? (
          <Spinner />
        ) : (
          view === 'Reviews' && (
            <ProfileUserReviews
              img={NoReviewsResultsImage}
              profileUserId={profileUserId}
              reviews={reviews}
              text={
                user._id === profileUserId()
                  ? 'You have not added any reviews'
                  : `${username} has not added any reviews`
              }
            />
          )
        )}
        {view === 'Favorites' && (
          <ProfileUserList
            userList="favorites"
            users={users}
            profileUserId={profileUserId}
            img={NoFavoritesResultsImage}
            text={
              user._id === profileUserId()
                ? 'You have not added any favorites'
                : `${username} has not added any favorites`
            }
          />
        )}
        {view === 'Watchlist' && (
          <ProfileUserList
            userList="watchList"
            users={users}
            profileUserId={profileUserId}
            img={NoWatchListResultsImage}
            text={
              user._id === profileUserId()
                ? 'You have not added any movies to your watch list'
                : `${username} has no movies on the watch list`
            }
          />
        )}
        {view === 'Edit Profile' && <EditProfile user={user} />}
        {(view === 'Followers' || view === 'Following') && (
          <Connections
            connections={
              view === 'Followers'
                ? profileUserFollowers()
                : view === 'Following' && profileUserFollowing()
            }
            setView={setView}
            userId={user._id}
            profileUserId={profileUserId()}
            username={username}
            view={view}
          />
        )}
      </Feed>
    </AppGrid>
  );
};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  reviews: PropTypes.array.isRequired,
  getReviews: PropTypes.func.isRequired,
  reviewsLoading: PropTypes.bool,
  getUsers: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  users: state.user.users,
  reviews: state.review.reviews,
  reviewsLoading: state.review.loading,
});

export default connect(mapStateToProps, {
  getReviews,
  getUsers,
  updateUser,
  logout,
})(Profile);
