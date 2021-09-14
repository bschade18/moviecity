import '../../styles/UserSearch.css';
import React, { useState, useEffect } from 'react';
import { getUsers } from '../../actions/users';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

const UserSearch = ({ users, getUsers, view }) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const searchUsers = (e) => setSearch(e.target.value);

  const clearSearch = () => setSearch('');

  const filtered = () =>
    users.filter((user) => {
      const regex = new RegExp(search, 'gi');
      return user.name.match(regex);
    });

  const showFiltered = () =>
    filtered().map((user) => (
      <div id="user-search-box" key={user._id}>
        <Link id="user-search-link" to={`/${user.username}`}>
          <img
            src={`/uploads/${user.photo}`}
            className="user-avatar-search"
            alt="user"
          />
          <div onClick={clearSearch} className="ml-2">
            {user.name}
          </div>
        </Link>
      </div>
    ));

  return (
    <div
      className={
        view === 'mobile'
          ? 'user-search m-auto d-lg-block user-search-mobile'
          : 'user-search m-auto d-lg-block'
      }
    >
      <div className="user-search-content">
        <FontAwesome className="fa-search-user" name="search" />
        <input
          type="text"
          placeholder="Find Friends"
          onChange={searchUsers}
          value={search}
          className="form-control user-search-input"
        />
      </div>
      <div>
        {search ? (
          filtered().length ? (
            showFiltered()
          ) : (
            <div id="user-search-box">No users found for "{search}"</div>
          )
        ) : null}
      </div>
    </div>
  );
};

UserSearch.propTypes = {
  users: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  users: state.user.users,
});

export default connect(mapStateToProps, { getUsers })(UserSearch);
