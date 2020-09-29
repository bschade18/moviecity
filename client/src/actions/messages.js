import api from '../utils/api';
import {
  GET_MESSAGES,
  SET_CURRENT_MESSAGE,
  UPDATE_MESSAGE,
  MESSAGES_LOADING,
  DELETE_MESSAGE,
  SEND_MESSAGE,
} from './types';

export const getMessages = () => async (dispatch) => {
  dispatch({
    type: MESSAGES_LOADING,
  });

  try {
    const res = await api.get('/messages');

    dispatch({
      type: GET_MESSAGES,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const setCurrentMessage = (current) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_MESSAGE,
    payload: current,
  });
};

export const sendMessage = (newMessage, history) => async (dispatch) => {
  try {
    const res = await api.post('/messages', newMessage);

    dispatch({
      type: SEND_MESSAGE,
      payload: res.data,
    });

    setTimeout(() => history.push('/home'), 500);
  } catch (err) {
    console.error(err);
  }
};

export const updateMessage = (messageId, message) => async (dispatch) => {
  try {
    const res = await api.put(`/messages/${messageId}`, message);

    dispatch({
      type: UPDATE_MESSAGE,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteMessage = (id, toggleChat) => async (dispatch) => {
  try {
    await api.delete(`/messages/${id}`);

    dispatch({
      type: DELETE_MESSAGE,
      payload: id,
    });

    toggleChat();
  } catch (err) {
    console.log(err);
  }
};
