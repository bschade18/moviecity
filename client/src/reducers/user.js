import { GET_USERS, GET_USER, FETCH_USER } from '../actions/types';

const initialState = {
  users: [],
  user: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_USERS:
      return {
        ...state,
        users: payload,
      };
    case FETCH_USER:
      return {
        ...state,
        loading: true,
      };
    case GET_USER:
      return {
        ...state,
        user: payload,
        loading: false,
      };
    default:
      return state;
  }
}
