import axios from 'axios';
import {
  GET_MESSAGES,
  SET_CURRENT_MESSAGE,
  UPDATE_MESSAGES,
  MESSAGES_LOADING,
} from './types';

export const getMessages = () => async (dispatch) => {
  dispatch({
    type: MESSAGES_LOADING,
  });

  try {
    const res = await axios.get('/messages');

    dispatch({
      type: GET_MESSAGES,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const setCurrentMessage = (current) => async (dispatch) => {
  try {
    dispatch({
      type: SET_CURRENT_MESSAGE,
      payload: current,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateMessages = (messageId, message) => async (dispatch) => {
  try {
    const res = await axios.put(`/messages/${messageId}`, message);

    console.log(res.data);
    dispatch({
      type: UPDATE_MESSAGES,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
