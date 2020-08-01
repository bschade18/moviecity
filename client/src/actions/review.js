import api from '../utils/api';
import {
  ADD_REVIEW,
  GET_REVIEWS,
  ADD_COMMENT,
  GET_REVIEW,
  FETCH_REVIEW,
  FETCH_REVIEWS,
} from './types';

export const getReviews = () => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_REVIEWS,
    });

    const res = await api.get('/reviews');

    dispatch({
      type: GET_REVIEWS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getReview = (id) => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_REVIEW,
    });

    const res = await api.get(`/reviews/${id}`);

    dispatch({
      type: GET_REVIEW,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const addReview = (newReview) => async (dispatch) => {
  try {
    const res = await api.post('/reviews', newReview);

    dispatch({
      type: ADD_REVIEW,
      payload: res.data,
    });

    setTimeout(() => (window.location = '/home'), 500);
  } catch (err) {
    console.error(err);
  }
};

export const addComment = (reviewId, formData) => async (dispatch) => {
  try {
    const res = await api.post(`/reviews/comment/${reviewId}`, formData);

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};
