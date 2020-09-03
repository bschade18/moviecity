import api from '../utils/api';
import {
  USER_LOADED,
  USER_LOADING,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  SET_FAVORITES,
  SET_WATCHLIST,
  SET_FRIENDS,
  UPDATE_IMAGE,
  GET_USER,
} from './types';

import { setAlert } from './alert';

// check token & load user
export const loadUser = () => async (dispatch) => {
  dispatch({ type: USER_LOADING });
  try {
    const res = await api.get('/auth/user');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

// register user
export const register = ({
  name,
  username,
  email,
  password,
  password2,
}) => async (dispatch) => {
  dispatch({ type: USER_LOADING });

  const body = JSON.stringify({ name, username, email, password, password2 });

  try {
    const res = await api.post('/auth/register', body);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    let errors = err.response.data.errors;

    dispatch(setAlert(errors));

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// login user
export const login = ({ email, password }) => async (dispatch) => {
  dispatch({ type: USER_LOADING });

  const body = JSON.stringify({ email, password });

  try {
    const res = await api.post('/auth/login', body);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    console.log(err);
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// logout
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT_SUCCESS,
  });
};

// update user
export const updateUserFriends = (updatedUser, user) => async (dispatch) => {
  try {
    const res = await api.put(`/users/${user._id}`, updatedUser);

    dispatch({
      type: SET_FRIENDS,
      payload: res.data.friends,
    });
  } catch (err) {
    console.log(err);
  }
};

// add movie to favorites
export const setFavorites = (userid, updateUser) => async (dispatch) => {
  try {
    const res = await api.put(`/auth/favorite/${userid}`, updateUser);

    dispatch({
      type: SET_FAVORITES,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

// update user watch list
export const setWatchList = (userid, updateUser) => async (dispatch) => {
  try {
    const res = await api.put(`/auth/watchlist/${userid}`, updateUser);

    dispatch({
      type: SET_WATCHLIST,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

// update user
export const updateUserImage = (filename) => (dispatch) => {
  try {
    dispatch({
      type: UPDATE_IMAGE,
      payload: filename,
    });
  } catch (err) {
    console.log(err);
  }
};

// find account for password reset
export const findAccount = (account) => async (dispatch) => {
  const body = JSON.stringify({ account });

  try {
    const res = await api.post('/auth/find', body);

    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

// reset password
export const resetPassword = ({ password, password2, token }) => async (
  dispatch
) => {
  const body = JSON.stringify({ password, password2 });

  try {
    await api.put(`/auth/resetpassword/${token}`, body);
  } catch (err) {
    let errors = err.response.data.errors;

    dispatch(setAlert(errors));
  }
};
