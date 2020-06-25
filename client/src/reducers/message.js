import {
  GET_MESSAGES,
  SET_CURRENT_MESSAGE,
  UPDATE_MESSAGES,
  MESSAGES_LOADING,
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
  loading: false,
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
    case SET_CURRENT_MESSAGE:
      return {
        ...state,
        currentMessage: payload,
        loading: false,
      };
    case UPDATE_MESSAGES:
      return {
        ...state,
        messages: state.messages.map((message) =>
          message._id === payload.id
            ? { ...message, conversation: [payload.conversation] }
            : message
        ),
        loading: false,
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
