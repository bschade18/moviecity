import React, { useState, useEffect } from 'react';
import { getUsers } from '../../actions/users';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const SearchBar = ({ getUsers, users }) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, []);

  const searchUsers = (e) => {
    setSearch(e.target.value);
  };

  const filtered = () => {
    return users.filter((user) => {
      const regex = new RegExp(search, 'gi');
      return user.name.match(regex);
    });
  };

  const showFiltered = () => {
    return filtered().map((user) => (
      <div id="user-search-box" key={user._id}>
        <Link id="user-search-link" to={`/${user.name}`}>
          <div>{user.name}</div>
        </Link>
      </div>
    ));
  };
  return (
    <div id="user-search">
      <div>
        <input
          type="text"
          placeholder="Find Friends"
          onChange={searchUsers}
          value={search}
          className="form-control"
        />
      </div>
      <div>
        {search
          ? filtered().length > 0
            ? showFiltered()
            : 'No users found'
          : null}
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  users: PropTypes.array.isRequired,
  getUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  users: state.user.users,
});

export default connect(mapStateToProps, { getUsers })(SearchBar);
