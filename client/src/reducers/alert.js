import { SET_ALERT, CLEAR_ALERTS } from '../actions/types';

const initialState = { alerts: [] };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return {
        ...state,
        alerts: [...payload],
      };

    case CLEAR_ALERTS:
      return {
        ...state,
        alerts: [],
      };
    default:
      return state;
  }
}
