import { SET_ALERT, CLEAR_ALERTS } from './types';
import { Dispatch } from 'redux';
import { Alert } from './interfaces';

export const setAlert = (errors: Alert) => (dispatch: Dispatch) => {
  dispatch({
    type: SET_ALERT,
    payload: errors,
  });
};

export const clearAlerts = () => (dispatch: Dispatch) => {
  dispatch({
    type: CLEAR_ALERTS,
  });
};
