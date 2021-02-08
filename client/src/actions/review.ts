import api from '../utils/api';
import {
  REVIEWS_LOADING,
  REVIEWS_LOADED,
  REVIEW_LOADING,
  REVIEW_LOADED,
  ADD_REVIEW,
  ADD_COMMENT,
} from './types';
import {
  Review,
  ReviewLoadedAction,
  ReviewsLoadedAction,
  AddReviewAction,
  AddCommentAction,
} from './interfaces';
import { Dispatch } from 'redux';


export const getReviews = () => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: REVIEWS_LOADING,
    });

    const res = await api.get<Review[]>('/reviews');

    dispatch<ReviewsLoadedAction>({
      type: REVIEWS_LOADED,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getReview = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: REVIEW_LOADING,
    });

    const res = await api.get<Review>(`/reviews/${id}`);

    dispatch<ReviewLoadedAction>({
      type: REVIEW_LOADED,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

// @ts-ignore
export const addReview = (newReview, history) => async (dispatch: Dispatch) => {
  try {
    const res = await api.post<Review>('/reviews', newReview);

    dispatch<AddReviewAction>({
      type: ADD_REVIEW,
      payload: res.data,
    });

    setTimeout(() => history.push('/home'), 500);
  } catch (err) {
    console.error(err);
  }
};

export const addComment = (
  reviewId: string,
  formData: { comments: Comment[] }
) => async (dispatch: Dispatch) => {
  try {
    const res = await api.put<Review>(`/reviews/${reviewId}`, formData);

    dispatch<AddCommentAction>({
      type: ADD_COMMENT,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};
