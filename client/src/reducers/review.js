import {
  REVIEWS_LOADING,
  REVIEWS_LOADED,
  REVIEW_LOADING,
  REVIEW_LOADED,
  ADD_REVIEW,
  ADD_COMMENT,
} from '../actions/types';

const initialState = {
  reviews: [],
  review: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case REVIEWS_LOADED:
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
    case REVIEWS_LOADING:
    case REVIEW_LOADING:
      return {
        ...state,
        loading: true,
      };
    case REVIEW_LOADED:
      return {
        ...state,
        review: payload,
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        review: { ...state.review, comments: payload.comments },
        loading: false,
      };
    default:
      return state;
  }
}
