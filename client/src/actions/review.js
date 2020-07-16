import axios from 'axios';
import { GET_REVIEWS, ADD_COMMENT, GET_REVIEW, FETCH_REVIEW } from './types';

export const getReviews = () => async (dispatch) => {
  try {
    const res = await axios.get('/reviews');

    dispatch({
      type: GET_REVIEWS,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
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
  } catch (err) {
    console.error(err);
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
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};
