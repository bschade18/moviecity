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

import {
  User,
  UserLoadedAction,
  RegisterProps,
  RegisterSuccessAction,
  LoginProps,
  UserWithToken,
  LoginSuccessAction,
  SetFriendsAction,
  SetFavoritesAction,
  SetWatchListAction,
  UpdateImageAction,
  GetUserAction,
  ResetPasswordProps,
} from './interfaces';

import { setAlert } from './alert';
import { Dispatch } from 'redux';

// check token & load user
export const loadUser = () => async (dispatch: Dispatch) => {
  dispatch({ type: USER_LOADING });
  try {
    const res = await api.get<User>('/auth/user');

    dispatch<UserLoadedAction>({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const register =
  ({ name, username, email, password, password2 }: RegisterProps) =>
  async (dispatch: Dispatch) => {
    dispatch({ type: USER_LOADING });

    const body = JSON.stringify({ name, username, email, password, password2 });

    try {
      const res = await api.post('/auth/register', body);

      dispatch<RegisterSuccessAction>({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      // @ts-ignore
      dispatch(loadUser());
    } catch (err) {
      let errors = err.response.data.errors;
      // @ts-ignore
      dispatch(setAlert(errors));

      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

export const login =
  ({ email, password }: LoginProps) =>
  async (dispatch: Dispatch) => {
    dispatch({ type: USER_LOADING });

    const body = JSON.stringify({ email, password });

    try {
      const res = await api.post<UserWithToken>('/auth/login', body);

      dispatch<LoginSuccessAction>({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      // @ts-ignore
      dispatch(loadUser());
    } catch (err) {
      console.log(err);
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

export const logout = () => (dispatch: Dispatch) => {
  dispatch({
    type: LOGOUT_SUCCESS,
  });
};

// update user
export const updateUserFriends =
  (updatedUser: object, user: { _id: string }) =>
  async (dispatch: Dispatch) => {
    try {
      const res = await api.put<User>(`/users/${user._id}`, updatedUser);

      dispatch<SetFriendsAction>({
        type: SET_FRIENDS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

// add movie to favorites
export const setFavorites =
  (userid: string, updateUser: object) => async (dispatch: Dispatch) => {
    try {
      const res = await api.put<User>(`/auth/favorite/${userid}`, updateUser);

      dispatch<SetFavoritesAction>({
        type: SET_FAVORITES,
        payload: res.data,
      });
    } catch (err) {
      console.error(err);
    }
  };

// update user watch list
export const setWatchList =
  (userid: string, updateUser: object) => async (dispatch: Dispatch) => {
    try {
      const res = await api.put<User>(`/auth/watchlist/${userid}`, updateUser);

      dispatch<SetWatchListAction>({
        type: SET_WATCHLIST,
        payload: res.data,
      });
    } catch (err) {
      console.error(err);
    }
  };

// update user
export const updateUserImage = (newPhoto: object) => (dispatch: Dispatch) =>
  dispatch<UpdateImageAction>({
    type: UPDATE_IMAGE,
    payload: newPhoto,
  });

// find account for password reset
export const findAccount = (account: string) => async (dispatch: Dispatch) => {
  const body = JSON.stringify({ account });

  try {
    const res = await api.post<User>('/auth/find', body);

    dispatch<GetUserAction>({
      type: GET_USER,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

// reset password
export const resetPassword =
  ({ password, password2, token }: ResetPasswordProps) =>
  async (dispatch: Dispatch) => {
    const body = JSON.stringify({ password, password2 });

    try {
      await api.put(`/auth/resetpassword/${token}`, body);
    } catch (err) {
      let errors = err.response.data.errors;

      // @ts-ignore
      dispatch(setAlert(errors));
    }
  };
