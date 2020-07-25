import axios from 'axios';
import {
  ADD_REVIEW,
  GET_REVIEWS,
  ADD_COMMENT,
  GET_REVIEW,
  FETCH_REVIEW,
} from './types';

export const getReviews = () => async (dispatch) => {
  try {
    const res = await axios.get('/reviews');

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

    const res = await axios.get(`/reviews/${id}`);

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
    const res = await axios.post('/reviews', newReview);

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
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(
      `/reviews/comment/${reviewId}`,
      formData,
      config
    );

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });

    console.log(res.data);
  } catch (err) {
    console.error(err);
  }
};
