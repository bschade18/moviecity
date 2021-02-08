import api from '../utils/api';
import {
  MESSAGES_LOADING,
  MESSAGES_LOADED,
  SET_CURRENT_MESSAGE,
  SEND_MESSAGE,
  UPDATE_MESSAGE,
  DELETE_MESSAGE,
} from './types';
import {
  Message,
  MessagesLoadedAction,
  SetCurrentMessageAction,
  SendMessageAction,
  Conversation,
  UpdateMessageAction,
} from './interfaces';
import { Dispatch } from 'redux';

export const getMessages = () => async (dispatch: Dispatch) => {
  dispatch({
    type: MESSAGES_LOADING,
  });

  try {
    const res = await api.get<Message[]>('/messages');

    dispatch<MessagesLoadedAction>({
      type: MESSAGES_LOADED,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const setCurrentMessage = (current: Message) => (dispatch: Dispatch) => {
  dispatch<SetCurrentMessageAction>({
    type: SET_CURRENT_MESSAGE,
    payload: current,
  });
};

// @ts-ignore
export const sendMessage = (newMessage: Message, history) => async (
  dispatch: Dispatch
) => {
  try {
    const res = await api.post('/messages', newMessage);

    dispatch<SendMessageAction>({
      type: SEND_MESSAGE,
      payload: res.data,
    });
    // @ts-ignore
    setTimeout(() => history.push('/home'), 500);
  } catch (err) {
    console.error(err);
  }
};

export const updateMessage = (
  messageId: string,
  conversation: Conversation
) => async (dispatch: Dispatch) => {
  try {
    const res = await api.put<Message>(`/messages/${messageId}`, conversation);

    dispatch<UpdateMessageAction>({
      type: UPDATE_MESSAGE,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteMessage = (id: string, toggleChat: () => void) => async (
  dispatch: Dispatch
) => {
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
