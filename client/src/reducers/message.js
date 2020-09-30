import {
  MESSAGES_LOADING,
  MESSAGES_LOADED,
  SET_CURRENT_MESSAGE,
  SEND_MESSAGE,
  UPDATE_MESSAGE,
  DELETE_MESSAGE,
} from '../actions/types';

const initialState = {
  messages: [],
  currentMessage: {},
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case MESSAGES_LOADING:
      return {
        ...state,
        loading: true,
      };
    case MESSAGES_LOADED:
      return {
        ...state,
        messages: payload,
        loading: false,
      };
    case SET_CURRENT_MESSAGE:
      return {
        ...state,
        currentMessage: payload,
        loading: false,
      };
    case SEND_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, payload],
        loading: false,
      };

    case UPDATE_MESSAGE:
      return {
        ...state,
        currentMessage: payload,
      };
    case DELETE_MESSAGE:
      return {
        ...state,
        messages: state.messages.filter(
          (message) => message._id !== payload.id
        ),
      };
    default:
      return state;
  }
}
