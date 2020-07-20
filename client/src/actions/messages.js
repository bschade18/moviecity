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

// get messages, change set currentmessage to getmessage and change current message to message in state?
// send message should be add message
// i think update messages should be update message?

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

// map through messages in state and update the message that matches the id in the payload
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

// send initial message
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

// adds a message onto the current message converation..from the messages page
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

// delete a message
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
