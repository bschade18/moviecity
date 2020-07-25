import {
  USER_LOADED,
  USER_LOADING,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  SET_FAVORITES,
  SET_WATCHLIST,
  SET_FRIENDS,
  UPDATE_IMAGE,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: true,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        token: null,
        isAuthenticated: null,
        loading: false,
        user: null,
      };
    case SET_FAVORITES:
      return {
        ...state,
        user: { ...state.user, favorites: payload },
      };
    case SET_WATCHLIST:
      return {
        ...state,
        user: { ...state.user, watchList: payload },
      };
    case SET_FRIENDS:
      return {
        ...state,
        user: { ...state.user, friends: payload },
      };
    case UPDATE_IMAGE:
      return {
        ...state,
        user: { ...state.user, photo: payload },
      };
    default:
      return state;
  }
}
