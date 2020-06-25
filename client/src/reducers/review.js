import { GET_REVIEWS } from '../actions/types';

const initialState = {
  reviews: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_REVIEWS:
      return {
        ...state,
        reviews: payload,
      };
    default:
      return state;
  }
}
