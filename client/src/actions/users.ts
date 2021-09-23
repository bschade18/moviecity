import api from '../utils/api';
import {
  GET_USERS,
  GET_USER,
  FETCH_USER,
  UPDATE_USER,
  UPDATE_USER_PHOTO,
} from './types';
import {
  User,
  GetUserAction,
  GetUsersAction,
  UpdateUserAction,
  UpdateUserPhotoAction,
} from './interfaces';
import { Dispatch } from 'redux';

export const getUsers = () => async (dispatch: Dispatch) => {
  try {
    const res = await api.get<User[]>('/users');

    dispatch<GetUsersAction>({
      type: GET_USERS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getUser = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: FETCH_USER,
    });

    const res = await api.get<User>(`/users/${id}`);

    dispatch<GetUserAction>({
      type: GET_USER,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const updateUser =
  (id: string, field: string) => async (dispatch: Dispatch) => {
    try {
      const res = await api.put<User>(`/users/${id}`, field);

      dispatch<UpdateUserAction>({
        type: UPDATE_USER,
        payload: res.data,
      });
    } catch (err) {
      console.error(err);
    }
  };

export const updateUserPhoto =
  (formData: object, setMessage: (message: string) => void, userId: string) =>
  async (dispatch: Dispatch) => {
    try {
      const res = await api.put(`/users/${userId}/photo`, formData);

      dispatch<UpdateUserPhotoAction>({
        type: UPDATE_USER_PHOTO,
        payload: res.data,
      });

      setMessage('Success!');
    } catch (err) {
      // @ts-ignore
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        // @ts-ignore
        setMessage(err.response.data.error);
      }
    }
  };
