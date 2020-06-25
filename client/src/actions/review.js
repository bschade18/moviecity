import axios from 'axios';
import { GET_REVIEWS } from './types';

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
