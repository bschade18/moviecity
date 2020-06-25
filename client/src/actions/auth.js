import axios from 'axios';
import {
  USER_LOADED,
  USER_LOADING,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from './types';

// check token & load user
export const loadUser = () => async (dispatch) => {
  dispatch({ type: USER_LOADING });

  try {
    const res = await axios.get('/auth/user');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

// register user
export const register = ({ name, email, password }) => async (dispatch) => {
  dispatch({ type: USER_LOADING });
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/auth/register', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    console.log(err);

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// login user
export const login = ({ email, password }) => async (dispatch) => {
  dispatch({ type: USER_LOADING });
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/auth/login', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    console.log(err);
  }
};

// logout
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT_SUCCESS,
  });
};

export const updateUser = (updatedUser, user) => async (dispatch) => {
  try {
    await axios.put(`/users/${user._id}`, updatedUser);

    dispatch(loadUser());
  } catch (err) {
    console.log(err);
  }
};
