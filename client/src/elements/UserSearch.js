import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SearchBar = () => {
  const [state, setState] = useState('');
  const [users, setUsers] = useState(null);

  useEffect(() => {
    axios
      .get('/users')
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const searchUsers = (e) => {
    const { value } = e.target;
    setState(value);
  };

  const filtered = () => {
    return users.filter((user) => {
      const regex = new RegExp(state, 'gi');
      return user.name.match(regex);
    });
  };

  const showFiltered = () => {
    return filtered().map((user) => (
      <div id="user-search-box" key={user._id}>
        <Link id="user-search-link" to={`/user/${user.name}`}>
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
          value={state}
          className="form-control"
        />
      </div>
      <div>
        {state
          ? filtered().length > 0
            ? showFiltered()
            : 'No users found'
          : null}
      </div>
    </div>
  );
};

export default SearchBar;
