import api from '../utils/api';
import { GET_USERS, GET_USER, FETCH_USER, UPDATE_USER } from './types';

export const getUsers = () => async (dispatch) => {
  try {
    const res = await api.get('/users');

    dispatch({
      type: GET_USERS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_USER,
    });

    const res = await api.get(`/users/${id}`);

    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const updateUser = (id, field) => async (dispatch) => {
  try {
    const res = await api.put(`/users/${id}`, field);

    dispatch({
      type: UPDATE_USER,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};
