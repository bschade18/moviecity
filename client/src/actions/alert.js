import { SET_ALERT, CLEAR_ALERTS } from './types';

export const setAlert = (errors) => (dispatch) => {
  dispatch({
    type: SET_ALERT,
    payload: errors,
  });
};

export const clearAlerts = () => (dispatch) => {
  dispatch({
    type: CLEAR_ALERTS,
  });
};
