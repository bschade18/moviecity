import axios from 'axios';
import {
  GET_MESSAGES,
  SET_CURRENT_MESSAGE,
  UPDATE_MESSAGES,
  MESSAGES_LOADING,
  ADD_MESSAGE,
  DELETE_MESSAGE,
  SEND_MESSAGE,
} from './types';

// get all messages
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

// set the current message
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
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.put(`/messages/${messageId}`, message, config);

    dispatch({
      type: UPDATE_MESSAGES,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

// create and send initial message
export const sendMessage = (newMessage) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/messages', newMessage, config);

    dispatch({
      type: SEND_MESSAGE,
      payload: res.data,
    });

    setTimeout(() => (window.location = '/home'), 500);
  } catch (err) {
    console.error(err);
  }
};

// add message to current conversation
export const addMessage = (messageId, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(`/messages/${messageId}`, formData, config);

    dispatch({
      type: ADD_MESSAGE,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const deleteMessage = (id, toggleConvo) => async (dispatch) => {
  try {
    await axios.delete(`/messages/${id}`);

    dispatch({
      type: DELETE_MESSAGE,
      payload: id,
    });

    toggleConvo();
  } catch (err) {
    console.log(err);
  }
};
