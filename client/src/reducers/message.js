import {
  GET_MESSAGES,
  SET_CURRENT_MESSAGE,
  UPDATE_MESSAGE,
  MESSAGES_LOADING,
  ADD_MESSAGE,
  DELETE_MESSAGE,
  SEND_MESSAGE,
} from '../actions/types';

const initialState = {
  messages: [],
  currentMessage: {
    movieTitle: '',
    sender: '',
    conversation: [],
    messageId: '',
    movieImg: '',
  },
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_MESSAGES:
      return {
        ...state,
        messages: payload,
        loading: false,
      };
    case SEND_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, payload],
        loading: false,
      };
    case SET_CURRENT_MESSAGE:
      return {
        ...state,
        currentMessage: payload,
        loading: false,
      };
    case ADD_MESSAGE:
    case UPDATE_MESSAGE:
      return {
        ...state,
        currentMessage: { ...state.currentMessage, conversation: payload },
      };
    case DELETE_MESSAGE:
      return {
        ...state,
        messages: state.messages.filter(
          (message) => message._id !== payload.id
        ),
      };
    case MESSAGES_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
