import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SearchBar = () => {
  const [state, setState] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const timeOut = useRef(null);

  const searchUsers = (e) => {
    const { value } = e.target;
    setLoading(true);
    clearTimeout(timeOut.current);

    if (value === '') {
      setUsers([]);
    } else {
      timeOut.current = setTimeout(async () => {
        const res = await axios.get('/users');
        console.log(res);
        setLoading(false);
        setUsers(res.data);
      }, 500);
    }
    setState(value);
  };

  const filterUsers = () => {
    return users.filter((user) => {
      const regex = new RegExp(state, 'gi');
      return user.name.match(regex);
    });
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
        {/* <FontAwesome className="fa-search" name="search" /> */}
      </div>
      <div>
        {users[0] &&
          filterUsers().map((user) => (
            <div id="user-search-box">
              <Link id="user-search-link" to={`/user/${user.name}`}>
                <div>{user.name}</div>
              </Link>
            </div>
          ))}
        {/* {state !== '' && !filtered && !loading && <div>No users found</div>} */}
      </div>
    </div>
  );
};

export default SearchBar;
