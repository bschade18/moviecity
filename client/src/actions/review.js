import api from '../utils/api';
import {
  FETCH_REVIEWS,
  FETCH_REVIEW,
  GET_REVIEWS,
  GET_REVIEW,
  ADD_REVIEW,
  ADD_COMMENT,
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

export const addReview = (newReview, history) => async (dispatch) => {
  try {
    const res = await api.post('/reviews', newReview);

    dispatch({
      type: ADD_REVIEW,
      payload: res.data,
    });

    setTimeout(() => history.push('/home'), 500);
  } catch (err) {
    console.error(err);
  }
};

export const addComment = (reviewId, formData) => async (dispatch) => {
  try {
    const res = await api.put(`/reviews/${reviewId}`, formData);

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};
