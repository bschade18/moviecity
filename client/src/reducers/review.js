import {
  ADD_REVIEW,
  GET_REVIEWS,
  ADD_COMMENT,
  GET_REVIEW,
  FETCH_REVIEW,
} from '../actions/types';

const initialState = {
  reviews: [],
  review: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_REVIEWS:
      return {
        ...state,
        reviews: payload,
        loading: false,
      };
    case ADD_REVIEW:
      return {
        ...state,
        reviews: [...state.reviews, payload],
      };
    case FETCH_REVIEW:
      return {
        ...state,
        loading: true,
      };
    case GET_REVIEW:
      return {
        ...state,
        review: payload,
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        review: { ...state.review, comments: payload },
        loading: false,
      };
    default:
      return state;
  }
}