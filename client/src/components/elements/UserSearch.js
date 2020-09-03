import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

const UserSearch = ({ users }) => {
  const [search, setSearch] = useState('');

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
          <div onClick={clearSearch}>{user.name}</div>
        </Link>
      </div>
    ));

  return (
    <div className="user-search m-auto d-none d-lg-block">
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
        {search
          ? filtered().length
            ? showFiltered()
            : 'No users found'
          : null}
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

export default connect(mapStateToProps)(UserSearch);
