import api from '../utils/api';
import { GET_USERS, GET_USER, FETCH_USER, UPDATE_USER } from './types';
import {
  User,
  GetUserAction,
  GetUsersAction,
  UpdateUserAction,
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

export const updateUser = (id: string, field: string) => async (
  dispatch: Dispatch
) => {
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
